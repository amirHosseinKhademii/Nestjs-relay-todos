import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardResolver } from './card.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './types/card.types';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  providers: [CardService, CardResolver],
  exports: [CardService],
})
export class CardModule {}
