import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GamesModule } from '../games/games.module';
import { GuessSchema } from './schema/guess.schema';
import { GuessesService } from './services/guesses.service';
import { GuessesController } from './guesses.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Guess', schema: GuessSchema }]), GamesModule],
  controllers: [GuessesController],
  providers: [GuessesService],
})
export class GuessesModule {}
