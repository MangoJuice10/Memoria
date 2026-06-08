import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './services/statistics.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FlashcardPhaseService } from 'src/flashcard/services/flashcard-phase.service';

@Module({
  imports: [PrismaModule],
  controllers: [StatisticsController],
  providers: [StatisticsService, FlashcardPhaseService],
})
export class StatisticsModule {}
