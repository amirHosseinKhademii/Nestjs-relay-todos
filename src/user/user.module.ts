import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from 'src/todo/todo.module';
import { User } from './typeorm/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { JwtStrategy } from './utils/jwt-strategy';

@Module({
  imports: [
    forwardRef(() => TodoModule),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'top-51',
      signOptions: { expiresIn: 24 * 3600 },
    }),
  ],
  providers: [UserService, UserResolver, JwtStrategy],
  exports: [JwtStrategy, PassportModule, UserService],
})
export class UserModule {}
