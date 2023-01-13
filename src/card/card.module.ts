import { forwardRef, Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardResolver } from './card.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './types/card.types';
import { TodoModule } from 'src/todo';
import { CommentModule } from 'src/comment';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card]),
    forwardRef(() => TodoModule),
    forwardRef(() => CommentModule),
  ],
  providers: [CardService, CardResolver],
  exports: [CardService],
})
export class CardModule {}
