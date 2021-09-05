import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { User } from './schema/user.schema';
import { UsersService } from './services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<User> {
    return this.service.findOne(id);
  }

  @Get('name/:name')
  public findByName(@Param('name') name: string): Promise<User> {
    return this.service.findByName(name);
  }

  @Post()
  public create(@Body() itemDto: UserDto): Promise<User> {
    return this.service.create(itemDto);
  }
}
