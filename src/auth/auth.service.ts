import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user-input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        console.log('User found:', user ? 'YES' : 'NO');
        console.log('Username:', username);
        
        if (!user) {
            console.log('User not found in database');
            return null;
        }
        
        console.log('Password from input:', password);
        console.log('Hashed password from DB:', user.password);
        
        const valid = await bcrypt.compare(password, user.password);
        console.log('Password valid:', valid);
        
        if (valid) {
            const { password: _pw, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {

        return {
            accessToken: this.jwtService.sign({ 
                username: user.username, 
                sub: user.id
            }),
            user,
        };
    }
    async signup(loginUserInput: LoginUserInput){
        const user = await this.usersService.findOneByUsername(loginUserInput.username);
        if(user){
            throw new UnauthorizedException('User already exists');
        }
        return this.usersService.create({
            username: loginUserInput.username,
            password: loginUserInput.password,
        });
    }
}