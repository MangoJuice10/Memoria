import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { GetAllUsersDto } from './dto/get-all-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminUserEntity } from './entities/admin-user.entity';
import { StatisticsDto } from './dto/get-statistics.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async getStatistics(): Promise<StatisticsDto> {
    const [
      totalUsers,
      totalDecks,
      totalFlashcards,
      totalReviews,
      totalTags,
      totalEducationalResources,
      totalFeedbacks,
      recentUsers,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.deck.count(),
      this.prisma.flashcard.count(),
      this.prisma.review.count(),
      this.prisma.tag.count(),
      this.prisma.educationalResource.count(),
      this.prisma.feedback.count(),
      this.prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true,
        },
      }),
    ]);

    return {
      totalUsers,
      totalDecks,
      totalFlashcards,
      totalReviews,
      totalTags,
      totalEducationalResources,
      totalFeedbacks,
      recentUsers,
    };
  }

  async getAllUsers(dto: GetAllUsersDto) {
    const { search, role, page = 1, limit = 50 } = dto;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { username: { contains: search } },
        { email: { contains: search } },
      ];
    }

    if (role) {
      where.userRoles = {
        some: {
          role: {
            name: role,
          },
        },
      };
    }

    try {
      const [users, total] = await Promise.all([
        this.prisma.user.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            username: true,
            email: true,
            avatarKey: true,
            createdAt: true,
            userRoles: {
              select: {
                role: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            _count: {
              select: {
                decks: true,
                educationalResources: true,
              },
            },
          },
        }),
        this.prisma.user.count({ where }),
      ]);

      // Transform the data
      const transformedUsers: AdminUserEntity[] = await Promise.all(
        users.map(async (user) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          avatarUrl: user.avatarKey
            ? await this.storageService.getPresignedUrl(user.avatarKey)
            : null,
          createdAt: user.createdAt,
          roles: user.userRoles.map((ur) => ur.role),
          _count: user._count,
        })),
      );

      return {
        data: transformedUsers,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      throw error;
    }
  }

  async getUserById(userId: number): Promise<AdminUserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        avatarKey: true,
        createdAt: true,
        userRoles: {
          select: {
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            decks: true,
            educationalResources: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarKey
        ? await this.storageService.getPresignedUrl(user.avatarKey)
        : null,
      createdAt: user.createdAt,
      roles: user.userRoles.map((ur) => ur.role),
      _count: user._count,
    };
  }

  async updateUser(
    userId: number,
    dto: UpdateUserDto,
  ): Promise<AdminUserEntity> {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Check email uniqueness if email is being updated
    if (dto.email && dto.email !== existingUser.email) {
      const emailExists = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (emailExists) {
        throw new ConflictException('Email already in use');
      }
    }

    // Update user
    await this.prisma.user.update({
      where: { id: userId },
      data: dto,
    });

    return this.getUserById(userId);
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Delete user (cascading deletes will handle related records)
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  // Deck management
  async getAllDecks(page: number = 1, limit: number = 50, search?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    try {
      const [decks, total] = await Promise.all([
        this.prisma.deck.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            description: true,
            isPublic: true,
            coverKey: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                username: true,
                email: true,
              },
            },
            _count: {
              select: {
                flashcards: true,
              },
            },
          },
        }),
        this.prisma.deck.count({ where }),
      ]);

      return {
        data: await Promise.all(
          decks.map(async (deck) => ({
            ...deck,
            coverUrl: deck.coverKey
              ? await this.storageService.getPresignedUrl(deck.coverKey)
              : null,
          })),
        ),
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error('Error in getAllDecks:', error);
      throw error;
    }
  }

  async deleteDeck(deckId: number): Promise<void> {
    const deck = await this.prisma.deck.findUnique({
      where: { id: deckId },
    });

    if (!deck) {
      throw new NotFoundException(`Deck with ID ${deckId} not found`);
    }

    await this.prisma.deck.delete({
      where: { id: deckId },
    });
  }

  // Flashcard management
  async getAllFlashcards(
    page: number = 1,
    limit: number = 50,
    deckId?: number,
    search?: string,
  ) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (deckId) {
      where.deckId = deckId;
    }

    if (search) {
      where.OR = [
        { front: { contains: search } },
        { back: { contains: search } },
      ];
    }

    const [flashcards, total] = await Promise.all([
      this.prisma.flashcard.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          front: true,
          back: true,
          repetitions: true,
          createdAt: true,
          deck: {
            select: {
              id: true,
              name: true,
              user: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.flashcard.count({ where }),
    ]);

    return {
      data: flashcards,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async deleteFlashcard(flashcardId: number): Promise<void> {
    const flashcard = await this.prisma.flashcard.findUnique({
      where: { id: flashcardId },
    });

    if (!flashcard) {
      throw new NotFoundException(`Flashcard with ID ${flashcardId} not found`);
    }

    await this.prisma.flashcard.delete({
      where: { id: flashcardId },
    });
  }

  // Tag management
  async getAllTags(page: number = 1, limit: number = 50, search?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (search) {
      where.name = { contains: search };
    }

    const [tags, total] = await Promise.all([
      this.prisma.tag.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        select: {
          id: true,
          name: true,
          color: true,
          _count: {
            select: {
              decks: true,
            },
          },
        },
      }),
      this.prisma.tag.count({ where }),
    ]);

    return {
      data: tags,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async deleteTag(tagId: number): Promise<void> {
    const tag = await this.prisma.tag.findUnique({
      where: { id: tagId },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${tagId} not found`);
    }

    await this.prisma.tag.delete({
      where: { id: tagId },
    });
  }

  // Educational Resource management
  async getAllEducationalResources(
    page: number = 1,
    limit: number = 50,
    search?: string,
  ) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { originalFilename: { contains: search } },
      ];
    }

    const [resources, total] = await Promise.all([
      this.prisma.educationalResource.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          description: true,
          originalFilename: true,
          fileKey: true,
          coverKey: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
          _count: {
            select: {
              decks: true,
            },
          },
        },
      }),
      this.prisma.educationalResource.count({ where }),
    ]);

    return {
      data: await Promise.all(
        resources.map(async (resource) => ({
          ...resource,
          fileUrl: resource.fileKey
            ? await this.storageService.getPresignedUrl(resource.fileKey)
            : null,
          coverUrl: resource.coverKey
            ? await this.storageService.getPresignedUrl(resource.coverKey)
            : null,
        })),
      ),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async deleteEducationalResource(resourceId: number): Promise<void> {
    const resource = await this.prisma.educationalResource.findUnique({
      where: { id: resourceId },
    });

    if (!resource) {
      throw new NotFoundException(
        `Educational resource with ID ${resourceId} not found`,
      );
    }

    await this.prisma.educationalResource.delete({
      where: { id: resourceId },
    });
  }

  // Feedback management
  async getAllFeedback(page: number = 1, limit: number = 50, search?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (search) {
      where.OR = [
        { content: { contains: search } },
        { user: { username: { contains: search } } },
        { deck: { name: { contains: search } } },
      ];
    }

    const [feedbacks, total] = await Promise.all([
      this.prisma.feedback.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          rating: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
          deck: {
            select: {
              id: true,
              name: true,
              user: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.feedback.count({ where }),
    ]);

    return {
      data: feedbacks,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async deleteFeedback(feedbackId: number): Promise<void> {
    const feedback = await this.prisma.feedback.findUnique({
      where: { id: feedbackId },
    });

    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${feedbackId} not found`);
    }

    await this.prisma.feedback.delete({
      where: { id: feedbackId },
    });
  }
}
