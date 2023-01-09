import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb://localhost/todos',
  synchronize: true,
  useUnifiedTopology: true,
};
