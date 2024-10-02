import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { username, password } = loginDto;
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtService.sign({ sub: user.id, roles: user.roles });

    return { token };
  }

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { username, password } = signUpDto;
    const foundUser = await this.usersService.findByUsername(username);
    if (foundUser) {
      throw new UnauthorizedException('User already exists');
    }
    const hashedPassword = await this.hashPassword(password);
    const user = await this.usersService.create(username, hashedPassword);
    const token = this.jwtService.sign({ sub: user.id, roles: user.roles });
    return { token };
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
