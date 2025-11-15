import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginUserInput {
    @Field(() => String)
    @IsString()
    @IsNotEmpty({ message: 'Username cannot be empty' })
    username: string;

    @Field(() => String)
    @IsString()
    @IsNotEmpty({ message: 'Password cannot be empty' })
    password: string;
}