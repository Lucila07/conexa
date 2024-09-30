// src/movie.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  episode_id: number;

  @Column('text')
  opening_crawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @Column()
  release_date: string;

  @Column('simple-array')
  characters: string[];

  @Column('simple-array')
  planets: string[];

  @Column('simple-array')
  starships: string[];

  @Column('simple-array')
  vehicles: string[];
  @Column('simple-array')
  species: string[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  edited: Date;

  @Column({ unique: true })
  url: string;
}
