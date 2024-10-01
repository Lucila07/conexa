import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import User from "./users/user.entity";
import { Movie } from './movies/movie.entity';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'database.sqlite',
            entities: [User, Movie],
            synchronize: true,  // Auto-syncs database schema, useful for development
        }),
        TypeOrmModule.forFeature([User]),
        MoviesModule, // Register your entity here
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
