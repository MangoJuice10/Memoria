import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from 'src/review/services/review.service';
import { Sm2Service } from "src/review/services/sm2.service";

@Module({
  providers: [ReviewService, Sm2Service],
  controllers: [ReviewController]
})
export class ReviewModule {}
