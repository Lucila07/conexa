import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from "./jwt-auth.guard";
import { SignUpDto } from "./dto/signup.dto";

interface LoginUserDto {
    username: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    @Post('signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(signUpDto);
    }
}
