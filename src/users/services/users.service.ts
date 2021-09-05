import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDto } from '../dto/user.dto';
import { User, UserDocument } from '../schema/user.schema';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  public async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  public async findByName(name: string): Promise<User> {
    const foundUser = await this.userModel.findOne({
      name,
    });

    if (!foundUser) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: "There's no user with the informed name",
      }, HttpStatus.NOT_FOUND);
    }

    return foundUser;
  }

  public async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  public async create(user: UserDto): Promise<User> {
    const sameNameUser = await this.userModel.findOne({
      name: user.name
    });

    if (sameNameUser) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: "There's an user with the same name already",
      }, HttpStatus.FORBIDDEN);
    }

    const usersCount = await this.userModel.count();

    if (usersCount > 19) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: "Can't create a new user due to a limit of 20 users",
      }, HttpStatus.FORBIDDEN);
    }

    const newUser = new this.userModel({
      name: user.name,
    });
    return await newUser.save();
  }

  public async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }

  public async update(id: string, item: UserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, item, { new: true });
  }
}
