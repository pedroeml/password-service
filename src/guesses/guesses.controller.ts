import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { GuessDto } from './dto/guess.dto';
import { Guess } from './schema/guess.schema';
import { GuessesService } from './services/guesses.service';

@Controller('guesses')
export class GuessesController {
  constructor(private readonly service: GuessesService) {}

  @Get('game/:id')
  public findAllByGame(@Param('id') id: string): Promise<Guess[]> {
    return this.service.findAllByGame(id)
  }

  @Post()
  public create(@Body() guessDto: GuessDto): Promise<Guess> {
    return this.service.create(guessDto);
  }
}
