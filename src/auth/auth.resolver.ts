import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user-input';
import { GqlAuthGuard } from './gql-auth.guard';
import { User } from '../users/entities/user.entity';


@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => LoginResponse)
    async login(
      @Args('loginUserInput') _loginUserInput: LoginUserInput,
      @Context() ctx: any
    ) 
    {
        return this.authService.login(ctx.req.user);
    }

    @Mutation(() => User)
    signup(@Args('loginUserInput') _loginUserInput: LoginUserInput) {
      return this.authService.signup(_loginUserInput);
    }
}