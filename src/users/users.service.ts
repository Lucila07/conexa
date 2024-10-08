import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({
      username,
    });
  }

  async create(
    username: string,
    hashedPassword: string,
    roles?: string,
  ): Promise<User> {
    const newUser = await this.usersRepository.create({
      username,
      password: hashedPassword,
      roles,
    });
    return this.usersRepository.save(newUser);
  }
}
