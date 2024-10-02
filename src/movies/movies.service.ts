import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    private readonly httpService: HttpService,
  ) {}

  async syncMovies() {
    try {
      console.log('Syncing movies with Star Wars API...');
      let apiUrl = 'https://swapi.dev/api/films/';
      let movies = [];
      let hasNextPage = true;
      while (hasNextPage) {
        const response = await lastValueFrom(this.httpService.get(apiUrl));
        const data = response.data;
        movies = [...movies, ...data.results];
        if (data.next) {
          apiUrl = data.next;
        } else {
          hasNextPage = false;
        }
      }
      await this.createOrUpdateMovies(movies);
      console.log(`Synced ${movies.length} movies.`);
    } catch (e) {
      console.log('Error syncing movies', e);
    }
  }

  private async createOrUpdateMovies(movies: Movie[]) {
    for (const movieData of movies) {
      const newMovie = {
        episode_id: movieData.episode_id,
        title: movieData.title,
        opening_crawl: movieData.opening_crawl,
        director: movieData.director,
        producer: movieData.producer,
        release_date: movieData.release_date,
        characters: movieData.characters,
        planets: movieData.planets,
        starships: movieData.starships,
        vehicles: movieData.vehicles,
        species: movieData.species,
        created: movieData.created,
        edited: movieData.edited,
        url: movieData.url,
      };
      const existingMovie = await this.movieRepository.findOne({
        where: { url: movieData.url },
      });
      const movie = !existingMovie
        ? this.movieRepository.create(newMovie)
        : this.movieRepository.merge(existingMovie, newMovie);
      console.log('Movie: ' + movie.title);
      await this.movieRepository.save(movie);
    }
  }

  findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return movie;
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const existingMovie = await this.movieRepository.findOne({
      where: { url: createMovieDto.url },
    });
    if (existingMovie) {
      throw new ConflictException('Movie already exists');
    }
    const newMovie = this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(newMovie);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<any> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    try {
      await this.movieRepository.update(id, updateMovieDto);
      return {
        message: 'Movie updated successfully',
        updatedMovie: await this.movieRepository.findOne({ where: { id } }),
      };
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new ConflictException('Movie with the given url already exists');
      }
      throw new BadRequestException('Bad request');
    }
  }

  async remove(id: string): Promise<any> {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    try {
      await this.movieRepository.delete(id);
      return {
        message: 'Movie deleted successfully',
        id: id,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete movie. Please try again later.',
      );
    }
  }
}
