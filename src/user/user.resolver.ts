import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserWithId } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { UserDocument } from './schema/user';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserWithId], { name: 'userList' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => UserWithId, { name: 'user' })
  findOne(@GetUser() user: UserDocument) {
    return user;
  }
}
