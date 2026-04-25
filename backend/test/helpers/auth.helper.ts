import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { LoginDto, RegisterDto } from "src/auth/schemas";

export function createAuthHelpers(
  httpServer: ReturnType<INestApplication["getHttpServer"]>,
  defaultRegisterDto: (...args: unknown[]) => Partial<RegisterDto>,
  defaultLoginDto: (...arts: unknown[]) => Partial<LoginDto>,
) {
  const register = (registerDto: Partial<RegisterDto> = defaultRegisterDto()) => {
    return request(httpServer).post("/auth/register").send(registerDto);
  };

  const login = (loginDto: Partial<LoginDto> = defaultLoginDto()) => {
    return request(httpServer).post("/auth/login").send(loginDto);
  };

  const retrieveAccessToken = (res: request.Response) => {
    return res.body.accessToken as string;
  };

  const retrieveRefreshTokenCookie = (res: request.Response) => {
    return res.headers["set-cookie"][0] as string;
  };

  return {
    register,
    login,
    retrieveAccessToken,
    retrieveRefreshTokenCookie,
  };
}
