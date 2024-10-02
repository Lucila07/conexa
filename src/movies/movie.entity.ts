import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The unique identifier of the movie' })
  id: string;

  @Column()
  @ApiProperty({ description: 'The title of the movie' })
  title: string;

  @Column()
  @ApiProperty({ description: 'The episode number of the movie' })
  episode_id: number;

  @Column('text')
  @ApiProperty({ description: 'The opening crawl text of the movie' })
  opening_crawl: string;

  @Column()
  @ApiProperty({ description: 'The director of the movie' })
  director: string;

  @Column()
  @ApiProperty({ description: 'The producer of the movie' })
  producer: string;

  @Column()
  @ApiProperty({ description: 'The release date of the movie' })
  release_date: string;

  @Column('simple-array')
  @ApiProperty({
    description: 'List of character URLs associated with the movie',
    type: [String],
  })
  characters: string[];

  @Column('simple-array')
  @ApiProperty({
    description: 'List of planet URLs associated with the movie',
    type: [String],
  })
  planets: string[];

  @Column('simple-array')
  @ApiProperty({
    description: 'List of starship URLs associated with the movie',
    type: [String],
  })
  starships: string[];

  @Column('simple-array')
  @ApiProperty({
    description: 'List of vehicle URLs associated with the movie',
    type: [String],
  })
  vehicles: string[];

  @Column('simple-array')
  @ApiProperty({
    description: 'List of species URLs associated with the movie',
    type: [String],
  })
  species: string[];

  @CreateDateColumn()
  @ApiProperty({ description: 'The creation date of the movie record' })
  created: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'The last updated date of the movie record' })
  edited: Date;

  @Column({ unique: true })
  @ApiProperty({ description: 'The unique URL of the movie' })
  url: string;
}
