import { DataSource } from 'typeorm';
import 'reflect-metadata';
import User from '../users/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [User],
  synchronize: false,
});

AppDataSource.initialize().catch((error) =>
  console.log('Error initializing data source:', error),
);
