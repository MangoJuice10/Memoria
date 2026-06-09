export class AdminUserEntity {
  id: number;
  username: string;
  email: string;
  avatarUrl: string | null;
  createdAt: Date;
  roles: Array<{
    id: number;
    name: string;
  }>;
  _count: {
    decks: number;
    educationalResources: number;
  };
}
