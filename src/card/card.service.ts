import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card, CardConnection } from './types/card.types';
import { connectionFromArraySlice } from 'graphql-relay';
import { ConnectionArgs, getPagingParameters } from 'src/relay/connection.args';
import { v4 as uuid } from 'uuid';
import { toGlobalId } from 'graphql-relay';
import { CreateCardInput } from './types/card.input';

@Injectable()
export class CardService {
  constructor(@InjectRepository(Card) private repo: Repository<Card>) {}

  async findAllCards(args: ConnectionArgs): Promise<CardConnection> {
    const { limit, offset } = getPagingParameters(args);
    const [results, count] = await this.repo.findAndCount({
      take: limit,
      skip: offset,
    });

    return connectionFromArraySlice(results, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
  }

  async findCardById(id: string) {
    return await this.repo.findOneBy({ id });
  }

  async addCard(args: CreateCardInput): Promise<Card> {
    const guid = uuid();
    const id = toGlobalId('Card', guid);
    const card = await this.repo.create({ ...args, id });
    return await this.repo.save(card);
  }
}
