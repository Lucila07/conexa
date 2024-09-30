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

  async findOne(id): Promise<User> {
    return this.usersRepository.findOneBy({
      id,
    });
  }

  async create(username: string, hashedPassword: string): Promise<User> {
    const newUser = await this.usersRepository.create({
      username,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }
}
