import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../roles-guard';
import { Roles } from '../decorators/roles.decorator';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './movie.entity';

@ApiTags('movies')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('movies')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: 'Unauthorized. You must be logged in to perform this action.',
})
@ApiResponse({
  status: 403,
  description: 'Forbidden. You do not have permission to perform this action.',
})
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('sync')
  @Roles('admin')
  @ApiOperation({ summary: 'Synchronize movies from the Stars Wars API' })
  @ApiResponse({
    status: 201,
    description: 'Movies synchronized successfully.',
  })
  async syncMovies() {
    return await this.moviesService.syncMovies();
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all movies' })
  @ApiResponse({
    status: 200,
    description: 'List of all movies',
    type: [Movie],
  })
  findAll() {
    return this.moviesService.findAll();
  }

  @Roles('user')
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a movie by ID' })
  @ApiResponse({ status: 200, description: 'The found movie', type: Movie })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new movie' })
  @ApiResponse({
    status: 201,
    description: 'The movie has been successfully created',
    type: Movie,
  })
  @ApiResponse({
    status: 409,
    description: 'Movie with the given url already exists',
  })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Roles('admin')
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing movie' })
  @ApiResponse({
    status: 200,
    description: 'The movie has been successfully updated',
    type: Movie,
  })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Roles('admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie by ID' })
  @ApiResponse({
    status: 200,
    description: 'The movie has been successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Failed to delete movie.',
  })
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
