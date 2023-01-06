import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card, CardConnection } from './types/card.types';
import { connectionFromArraySlice } from 'graphql-relay';
import { ConnectionArgs, getPagingParameters } from 'src/relay';
import { v4 as uuid } from 'uuid';
import { toGlobalId } from 'graphql-relay';
import { CreateCardInput } from './types/card.input';
import { TodoService } from 'src/todo';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private repo: Repository<Card>,
    @Inject(forwardRef(() => TodoService)) private todoService: TodoService,
  ) {}

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

  async addCard(input: CreateCardInput) {
    const guid = uuid();
    const id = toGlobalId('Card', guid);
    const card = await this.repo.create({ ...input, id });
    await this.todoService.updateCardsInTodoById({
      todoId: input.todoId,
      cardId: id,
    });
    const reslut = await this.repo.save(card);
    return { card: reslut };
  }

  async findCardsByIds(
    args: ConnectionArgs,
    cardIds: string[],
  ): Promise<CardConnection> {
    const { limit, offset } = getPagingParameters(args);
    const [results, count] = await this.repo.findAndCount({
      take: limit,
      skip: offset,
      where: {
        id: { $in: cardIds ?? [] } as any,
      },
    });
    return connectionFromArraySlice(results, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
  }
}
