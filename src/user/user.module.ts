import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './types';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { JwtStrategy } from './utils/jwt-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'top-51',
      signOptions: { expiresIn: 24 * 100 * 3600 },
    }),
  ],
  providers: [UserService, UserResolver, JwtStrategy],
  exports: [JwtStrategy, PassportModule, UserService],
})
export class UserModule {}
