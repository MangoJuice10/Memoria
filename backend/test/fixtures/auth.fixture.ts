import { LoginDto, RegisterDto } from "src/auth/schemas";

export function createAuthFixtures(
  username: string,
  email: string,
  password: string,
) {
  const createRegisterDto = (overrides?: Partial<RegisterDto>): RegisterDto => {
    return {
      username,
      email,
      password,
      confirmPassword: password,
      ...overrides,
    };
  };

  const createLoginDto = (overrides?: Partial<LoginDto>): LoginDto => {
    return {
      email,
      password,
      ...overrides,
    };
  };

  return {
    createRegisterDto,
    createLoginDto,
  };
}
