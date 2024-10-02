import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import User from './users/user.entity';
import { Movie } from './movies/movie.entity';
import { UserSeederService } from './database/seeders/usersSeeder';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Movie],
      synchronize: true, // Auto-syncs database schema, useful for development
    }),
    TypeOrmModule.forFeature([User]),
    MoviesModule,
  ],
  providers: [UserSeederService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly userSeederService: UserSeederService) {}

  async onModuleInit() {
    await this.userSeederService.seed();
  }
}
