import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './types';
import { CardModule } from 'src/card';
import { UserModule } from 'src/user';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    forwardRef(() => CardModule),
    //UserModule,
  ],
  providers: [CommentService, CommentResolver],
  exports: [CommentService],
})
export class CommentModule {}
