import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class UserSeederService {
  constructor(private readonly usersService: UsersService) {}

  async seed() {
    await this.createDefaultUsers();
  }

  private async createDefaultUsers() {
    const adminUser = {
      username: 'admin',
      password: 'admin123',
      role: 'admin',
    };

    const commonUser = {
      username: 'user',
      password: 'user123',
      role: 'user',
    };

    const adminExists = await this.usersService.findByUsername(
      adminUser.username,
    );
    const userExists = await this.usersService.findByUsername(
      commonUser.username,
    );

    if (!adminExists) {
      await this.usersService.create(
        adminUser.username,
        adminUser.password,
        'admin',
      );
      console.log('Admin user created');
    }

    if (!userExists) {
      await this.usersService.create(commonUser.username, commonUser.password);
      console.log('Common user created');
    }
  }
}
