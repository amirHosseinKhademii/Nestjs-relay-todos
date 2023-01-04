import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card, CardResponse } from './types/card.types';
import { connectionFromArraySlice } from 'graphql-relay';
import { ConnectionArgs, getPagingParameters } from 'src/relay/connection.args';
import { CardCreateArgs } from './types/card.create.args';
import { v4 as uuid } from 'uuid';
import { ID } from '@nestjs/graphql';
import { ResolvedGlobalId } from 'nestjs-relay';
import { fromGlobalId, toGlobalId } from 'graphql-relay';

@Injectable()
export class CardService {
  constructor(@InjectRepository(Card) private repo: Repository<Card>) {}

  async findAllCards(args: ConnectionArgs): Promise<CardResponse> {
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

  async findCardById(Id: string) {
    // const { id } = fromGlobalId(Id as unknown as string);

    return await this.repo.findOneBy({ id: Id });
  }

  async addCard(args: CardCreateArgs): Promise<Card> {
    const guid = uuid();
    const id = toGlobalId('Card', guid);
    const card = await this.repo.create({ ...args, id });

    // const { id: resId } = fromGlobalId(card.id as unknown as string);
    // console.log({ card, resId, guid });

    return await this.repo.save(card);
  }
}
