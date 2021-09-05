import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { GameDto } from '../dto/game.dto';
import { Game, GameDocument } from '../schema/game.schema';


@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private readonly gameModel: Model<GameDocument>) {}

  public async findAll(): Promise<Game[]> {
    return await this.gameModel.find();
  }

  public async findAllByWinner(winnerUserId?: string): Promise<Game[]> {
    return await this.gameModel.find({
      winnerUserId,
    });
  }

  public async findAllInProgress(): Promise<Game[]> {
    return await this.gameModel.find({
      winnerUserId: undefined,
    }, { answer: 0 });
  }

  public async findOne(id: string, displayAnswer = false): Promise<Game> {
    return displayAnswer
      ? await this.gameModel.findById(id)
      : await this.gameModel.findById(id, { answer: 0 });
  }

  public async create(game: GameDto): Promise<Game> {
    const sameOwnerGame = await this.gameModel.findOne({
      ownerUserId: game.ownerUserId,
      winnerUserId: undefined,
    });

    if (sameOwnerGame) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: "There's a game still in progress for this user",
      }, HttpStatus.FORBIDDEN);
    } else if (game.answer.length !== 5) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Password's length must be 5",
      }, HttpStatus.BAD_REQUEST);
    }

    const newGame = new this.gameModel({
      answer: game.answer,
      ownerUserId: game.ownerUserId,
    });
    return await newGame.save();
  }

  public async delete(id: string): Promise<Game> {
    return await this.gameModel.findByIdAndRemove(id);
  }

  public async update(id: string, item: GameDto): Promise<Game> {
    return await this.gameModel.findByIdAndUpdate(id, item, { new: true });
  }
}
