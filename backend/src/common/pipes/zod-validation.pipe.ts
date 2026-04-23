import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
} from "@nestjs/common";
import type { ZodType } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodType) {}
  transform(value: unknown, metadata: ArgumentMetadata) {
    return this.schema.parse(value);
  }
}
