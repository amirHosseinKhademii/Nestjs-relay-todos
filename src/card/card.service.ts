import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './types/card.types';
import { connectionFromArraySlice } from 'graphql-relay';
import { ConnectionArgs, getPagingParameters } from 'src/relay/connection.args';
import { CardCreateArgs } from './types/card.create.args';
import { v4 as uuid } from 'uuid';
import { CardResponse } from './types/card.response';

@Injectable()
export class CardService {
  constructor(@InjectRepository(Card) private repo: Repository<Card>) {}

  async findAllCards(args: ConnectionArgs): Promise<CardResponse> {
    const { limit, offset } = getPagingParameters(args);
    const [teams, count] = await this.repo.findAndCount({
      take: limit,
      skip: offset,
    });
    return connectionFromArraySlice(teams, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
  }

  async addCard(args: CardCreateArgs): Promise<Card> {
    const card = await this.repo.create({ ...args, id: uuid() });
    return await this.repo.save(card);
  }
}
