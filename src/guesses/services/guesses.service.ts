import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { GamesService } from '../../games/services/games.service';
import { GuessDto } from '../dto/guess.dto';
import { Guess, GuessDocument } from '../schema/guess.schema';

@Injectable()
export class GuessesService {
  constructor(
    @InjectModel(Guess.name) private readonly guessModel: Model<GuessDocument>,
    private gamesService: GamesService,
  ) {}


  public async findAllByGame(gameId?: string): Promise<Guess[]> {
    return await this.guessModel.find({
      gameId,
    });
  }

  public async create(guess: GuessDto): Promise<Guess> {
    const sameGuess = await this.guessModel.findOne({
      gameId: guess.gameId,
      guess: guess.guess,
    });

    if (sameGuess) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: "Someone posted the same guess already",
      }, HttpStatus.FORBIDDEN);
    } else if (guess.guess.length !== 5) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Guess's length must be 5",
      }, HttpStatus.BAD_REQUEST);
    }

    const game = await this.gamesService.findOne(guess.gameId, true);

    if (game.winnerUserId) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: "This game has a winner already",
      }, HttpStatus.FORBIDDEN);
    }

    const wrongCharsIndexes = [];
    let correctChars = 0;
    let misplacedChars = 0;

    for (let i = 0; i < game.answer.length; i++) {
      if (game.answer[i] === guess.guess[i]) {
        correctChars++;
      } else {
        wrongCharsIndexes.push(i);
      }
    }

    if (correctChars < 5) {
      wrongCharsIndexes.forEach(i => {
        const guessedChar = guess.guess[i];
  
        if (wrongCharsIndexes.some(j => i !== j && game.answer[j] === guessedChar)) {
          misplacedChars++;
        }
      });
    } else {
      game.winnerUserId = guess.ownerUserId;
      await this.gamesService.update(guess.gameId, game);
    }

    const newGame = new this.guessModel({
      guess: guess.guess,
      gameId: guess.gameId,
      ownerUserId: guess.ownerUserId,
      correctChars,
      misplacedChars,
    });
    return await newGame.save();
  }
}
