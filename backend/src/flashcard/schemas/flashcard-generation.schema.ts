import z from "zod";

export const instructionSchema = z.string().min(10).max(10000);