import type {User} from "@/types/User";

export interface IAuthService {
    login(email: string, password: string): Promise<User>;

    logout(): Promise<void>;

    getCurrentUser(): Promise<User | null>;
}

export class MockAuthService implements IAuthService {
    private _mockUsers: User[] = [
        {
            id: 1,
            email: "user@example.com",
            roles: ["user"],
            language: "ru",
            isActive: true,
        },
        {
            id: 2,
            email: "admin@example.com",
            roles: ["admin"],
            language: "en",
            isActive: true,
        },
        {
            id: 3,
            email: "blockedUser@example.com",
            roles: ["user"],
            language: "ru",
            isActive: false,
        }
    ];
    private _currentUser: User | null = null;

    async login(email: string) {
        const user = this._mockUsers.find(user => user.email === email);
        if (!user) throw new Error("User not found");
        this._currentUser = user;
        return user;
    }

    async logout() {
        this._currentUser = null;
    }

    async getCurrentUser() {
        return this._currentUser;
    }
}