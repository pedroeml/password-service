import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GameSchema } from './schema/game.schema';
import { GamesService } from './services/games.service';
import { GamesController } from './games.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Game', schema: GameSchema }])],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}
