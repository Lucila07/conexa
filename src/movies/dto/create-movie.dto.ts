import { IsArray, IsDateString, IsInt, IsString, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsInt()
  episode_id: number;

  @IsString()
  opening_crawl: string;

  @IsString()
  director: string;

  @IsString()
  producer: string;

  @IsDateString()
  release_date: string;

  @IsArray()
  @IsString({ each: true })
  characters: string[];

  @IsArray()
  @IsUrl({}, { each: true })
  planets: string[];

  @IsArray()
  @IsUrl({}, { each: true })
  starships: string[];

  @IsArray()
  @IsUrl({}, { each: true })
  vehicles: string[];

  @IsArray()
  @IsUrl({}, { each: true })
  species: string[];

  @IsDateString()
  created: string;

  @IsDateString()
  edited: string;

  @IsUrl()
  url: string;
}
