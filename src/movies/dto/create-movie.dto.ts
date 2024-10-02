import { IsArray, IsDateString, IsInt, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ description: 'The title of the movie', example: 'A New Hope' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The episode ID of the movie', example: 4 })
  @IsInt()
  episode_id: number;

  @ApiProperty({
    description: 'The opening crawl text of the movie',
    example: 'It is a period of civil war...',
  })
  @IsString()
  opening_crawl: string;

  @ApiProperty({
    description: 'The director of the movie',
    example: 'George Lucas',
  })
  @IsString()
  director: string;

  @ApiProperty({
    description: 'The producer of the movie',
    example: 'Gary Kurtz',
  })
  @IsString()
  producer: string;

  @ApiProperty({
    description: 'The release date of the movie in ISO format',
    example: '1977-05-25',
  })
  @IsDateString()
  release_date: string;

  @ApiProperty({
    description: 'An array of character URLs',
    example: [
      'https://swapi.dev/api/people/1/',
      'https://swapi.dev/api/people/2/',
    ],
  })
  @IsArray()
  @IsString({ each: true })
  characters: string[];

  @ApiProperty({
    description: 'An array of planet URLs',
    example: [
      'https://swapi.dev/api/planets/1/',
      'https://swapi.dev/api/planets/2/',
    ],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  planets: string[];

  @ApiProperty({
    description: 'An array of starship URLs',
    example: [
      'https://swapi.dev/api/starships/1/',
      'https://swapi.dev/api/starships/2/',
    ],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  starships: string[];

  @ApiProperty({
    description: 'An array of vehicle URLs',
    example: [
      'https://swapi.dev/api/vehicles/1/',
      'https://swapi.dev/api/vehicles/2/',
    ],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  vehicles: string[];

  @ApiProperty({
    description: 'An array of species URLs',
    example: [
      'https://swapi.dev/api/species/1/',
      'https://swapi.dev/api/species/2/',
    ],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  species: string[];

  @ApiProperty({
    description: 'The creation date of the movie in ISO format',
    example: '2014-12-20T19:49:45.256Z',
  })
  @IsDateString()
  created: string;

  @ApiProperty({
    description: 'The last edited date of the movie in ISO format',
    example: '2014-12-20T19:49:45.256Z',
  })
  @IsDateString()
  edited: string;

  @ApiProperty({
    description: 'The URL of the movie resource',
    example: 'https://swapi.dev/api/films/1/',
  })
  @IsUrl()
  url: string;
}
