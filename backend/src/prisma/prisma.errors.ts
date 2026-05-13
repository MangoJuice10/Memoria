import { Prisma } from "@prisma/client";

export function isPrismaNotFoundError(error: Error): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025";
}
