import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

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
}
