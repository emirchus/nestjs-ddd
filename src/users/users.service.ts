import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import { v4 as uuid } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async createUser(email: string, age: number): Promise<User> {
    return this.usersRepository.create({
      userId: uuid(),
      email,
      age,
      favoriteFoods: [],
    });
  }

  async updateUser(userId: string, dto: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ userId }, dto);
  }
}
