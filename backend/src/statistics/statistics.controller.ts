import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { StatisticsService } from './services/statistics.service';

@Controller('decks/:deckId/statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  async getStatistics(
    @Param('deckId', ParseIntPipe) deckId: number,
    @Query('period') period: '1month' | '3months' | '1year' | 'all' = '1year',
    @Query('includeBacklog') includeBacklog: string = 'true',
  ) {
    return this.statisticsService.getStatistics(
      deckId,
      period,
      includeBacklog === 'true',
    );
  }
}
