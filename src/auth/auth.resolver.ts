import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterUserInput } from './dto/register-user.input';
import { Login } from './entities/login.entity';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { name: 'registerUser' })
  create(@Args('registerUserInput') createUserInput: RegisterUserInput) {
    return this.authService.create(createUserInput);
  }

  @Mutation(() => Login, { name: 'login' })
  login(@Args('loginUserInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
