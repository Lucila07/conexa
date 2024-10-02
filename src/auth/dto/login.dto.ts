import { ApiProperty } from '@nestjs/swagger';
import { SignUpDto } from './signup.dto';

export class LoginDto extends SignUpDto {
  @ApiProperty({
    description: 'Username for login',
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    description: 'Password for login',
    example: 'password123',
  })
  password: string;
}
