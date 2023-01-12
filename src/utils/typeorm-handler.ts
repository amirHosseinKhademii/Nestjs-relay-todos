import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.LOCAL_MONGO_URL,
  synchronize: true,
  useUnifiedTopology: true,
};
