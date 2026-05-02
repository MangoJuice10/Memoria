import type { CookieOptions } from "express";

export const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

export const getRefreshTokenCookieOptions = (): CookieOptions => {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/auth/refresh",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
};
