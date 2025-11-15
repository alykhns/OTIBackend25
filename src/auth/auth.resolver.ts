import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user-input';
import { GqlAuthGuard } from './gql-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { Query } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user-input';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => LoginResponse)
    async login(
      @Args('loginUserInput') loginUserInput: LoginUserInput,
    ) 
    {
      const user = await this.authService.validateUser(
        loginUserInput.username,
        loginUserInput.password
      );
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      return this.authService.login(user);
    }

    @Mutation(() => User)
    signup(@Args('createUserInput') _createUserInput: CreateUserInput) {
      return this.authService.signup(_createUserInput);
    }

    @Query(() => User)
    @UseGuards(JwtAuthGuard) 
    getMyProfile(@CurrentUser() user: User) 
    {
      return user;
    }
}