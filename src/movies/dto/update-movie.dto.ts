import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @ApiProperty({
    description: 'The title of the movie (optional)',
    example: 'The Empire Strikes Back',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'The episode ID of the movie (optional)',
    example: 5,
    required: false,
  })
  episode_id?: number;

  @ApiProperty({
    description: 'The opening crawl text of the movie (optional)',
    example: 'It is a dark time for the Rebellion...',
    required: false,
  })
  opening_crawl?: string;

  @ApiProperty({
    description: 'The director of the movie (optional)',
    example: 'Irvin Kershner',
    required: false,
  })
  director?: string;

  @ApiProperty({
    description: 'The producer of the movie (optional)',
    example: 'Gary Kurtz',
    required: false,
  })
  producer?: string;

  @ApiProperty({
    description: 'The release date of the movie in ISO format (optional)',
    example: '1980-05-21',
    required: false,
  })
  release_date?: string;

  @ApiProperty({
    description: 'An array of character URLs (optional)',
    example: [
      'https://swapi.dev/api/people/1/',
      'https://swapi.dev/api/people/2/',
    ],
    required: false,
  })
  characters?: string[];

  @ApiProperty({
    description: 'An array of planet URLs (optional)',
    example: [
      'https://swapi.dev/api/planets/1/',
      'https://swapi.dev/api/planets/2/',
    ],
    required: false,
  })
  planets?: string[];

  @ApiProperty({
    description: 'An array of starship URLs (optional)',
    example: [
      'https://swapi.dev/api/starships/1/',
      'https://swapi.dev/api/starships/2/',
    ],
    required: false,
  })
  starships?: string[];

  @ApiProperty({
    description: 'An array of vehicle URLs (optional)',
    example: [
      'https://swapi.dev/api/vehicles/1/',
      'https://swapi.dev/api/vehicles/2/',
    ],
    required: false,
  })
  vehicles?: string[];

  @ApiProperty({
    description: 'An array of species URLs (optional)',
    example: [
      'https://swapi.dev/api/species/1/',
      'https://swapi.dev/api/species/2/',
    ],
    required: false,
  })
  species?: string[];

  @ApiProperty({
    description: 'The creation date of the movie in ISO format (optional)',
    example: '2014-12-20T19:49:45.256Z',
    required: false,
  })
  created?: string;

  @ApiProperty({
    description: 'The last edited date of the movie in ISO format (optional)',
    example: '2014-12-20T19:49:45.256Z',
    required: false,
  })
  edited?: string;

  @ApiProperty({
    description: 'The URL of the movie resource (optional)',
    example: 'https://swapi.dev/api/films/1/',
    required: false,
  })
  url?: string;
}
