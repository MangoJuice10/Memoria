import { LoginDto, RegisterDto } from "src/auth/schemas";

export function createAuthFixtures(
  email: string,
  password: string,
) {
  const createRegisterDto = (overrides?: Partial<RegisterDto>): RegisterDto => {
    return {
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
