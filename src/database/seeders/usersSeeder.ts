import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class UserSeederService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  async seed() {
    await this.createDefaultUsers();
  }

  private async createDefaultUsers() {
    const adminUser = {
      username: 'admin',
      hashedPassword: await this.authService.hashPassword('admin123'),
      role: 'admin',
    };

    const commonUser = {
      username: 'user',
      hashedPassword: await this.authService.hashPassword('user123'),
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
        adminUser.hashedPassword,
        'admin',
      );
      console.log('Admin user created');
    }

    if (!userExists) {
      await this.usersService.create(
        commonUser.username,
        commonUser.hashedPassword,
      );
      console.log('Common user created');
    }
  }
}
