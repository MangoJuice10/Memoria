import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { GetAllUsersDto } from './dto/get-all-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from '../rbac/guards/role.guard';
import { RequiresRole } from '../rbac/decorators/requires-role.decorator';

@Controller('admin')
@UseGuards(RoleGuard)
@RequiresRole('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('statistics')
  getStatistics() {
    return this.adminService.getStatistics();
  }

  // User Management
  @Get('users')
  getAllUsers(@Query() dto: GetAllUsersDto) {
    // Parse numeric fields
    const parsedDto = {
      ...dto,
      page: dto.page ? Number(dto.page) : 1,
      limit: dto.limit ? Number(dto.limit) : 20,
    };
    return this.adminService.getAllUsers(parsedDto);
  }

  @Get('users/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getUserById(id);
  }

  @Put('users/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.adminService.updateUser(id, dto);
  }

  @Delete('users/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteUser(id);
  }

  // Deck Management
  @Get('decks')
  getAllDecks(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    // Parse numeric fields
    const parsedPage = page ? Number(page) : 1;
    const parsedLimit = limit ? Number(limit) : 20;
    return this.adminService.getAllDecks(parsedPage, parsedLimit, search);
  }

  @Delete('decks/:id')
  deleteDeck(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteDeck(id);
  }

  // Flashcard Management
  @Get('flashcards')
  getAllFlashcards(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('deckId') deckId?: string,
    @Query('search') search?: string,
  ) {
    // Parse numeric fields
    const parsedPage = page ? Number(page) : 1;
    const parsedLimit = limit ? Number(limit) : 20;
    const parsedDeckId = deckId ? Number(deckId) : undefined;
    return this.adminService.getAllFlashcards(
      parsedPage,
      parsedLimit,
      parsedDeckId,
      search,
    );
  }

  @Delete('flashcards/:id')
  deleteFlashcard(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteFlashcard(id);
  }

  // Tag Management
  @Get('tags')
  getAllTags(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    const parsedPage = page ? Number(page) : 1;
    const parsedLimit = limit ? Number(limit) : 20;
    return this.adminService.getAllTags(parsedPage, parsedLimit, search);
  }

  @Delete('tags/:id')
  deleteTag(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteTag(id);
  }

  // Educational Resource Management
  @Get('resources')
  getAllEducationalResources(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    const parsedPage = page ? Number(page) : 1;
    const parsedLimit = limit ? Number(limit) : 20;
    return this.adminService.getAllEducationalResources(
      parsedPage,
      parsedLimit,
      search,
    );
  }

  @Delete('resources/:id')
  deleteEducationalResource(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteEducationalResource(id);
  }

  // Feedback Management
  @Get('feedback')
  getAllFeedback(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    const parsedPage = page ? Number(page) : 1;
    const parsedLimit = limit ? Number(limit) : 20;
    return this.adminService.getAllFeedback(parsedPage, parsedLimit, search);
  }

  @Delete('feedback/:id')
  deleteFeedback(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteFeedback(id);
  }
}
