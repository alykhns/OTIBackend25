import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'Aliya',
      password: 'not-secure',
    },
    {
      id: 2,
      username: 'Rafathin',
      password: 'not-secure',
    }

  ];

  create(createUserInput: CreateUserInput) {
    const user = {
      ...createUserInput,
      id: this.users.length + 1,
    };
    this.users.push(user);
    console.log(this.users);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find( user => user.id === id);
  }

  findOneByUsername(username: string) {
    return this.users.find(user => user.username === username);
  }
}
