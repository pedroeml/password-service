import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { GamesModule } from './games/games.module';
import { GuessesModule } from './guesses/guesses.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
