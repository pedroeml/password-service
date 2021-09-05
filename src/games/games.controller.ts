import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { GameDto } from './dto/game.dto';
import { Game } from './schema/game.schema';
import { GamesService } from './services/games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly service: GamesService) {}

  @Get('in-progress')
  public findAllInProgress(): Promise<Game[]> {
    return this.service.findAllInProgress();
  }

  @Get('winner/:id')
  public findAllUserWon(@Param('id') id: string): Promise<Game[]> {
    return this.service.findAllByWinner(id)
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<Game> {
    return this.service.findOne(id);
  }

  @Post()
  public create(@Body() gameDto: GameDto): Promise<Game> {
    return this.service.create(gameDto);
  }
}
