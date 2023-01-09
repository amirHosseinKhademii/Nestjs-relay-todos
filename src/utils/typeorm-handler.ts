import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.URL,
  synchronize: true,
  useUnifiedTopology: true,
};
