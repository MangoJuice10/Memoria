import { z } from "zod";

export function createCountSchema(min: number, max: number) {
  return z.number().int().min(min).max(max);
}
