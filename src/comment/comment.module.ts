import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './types';
import { CardModule } from 'src/card';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), forwardRef(() => CardModule)],
  providers: [CommentService, CommentResolver],
  exports: [CommentService],
})
export class CommentModule {}
