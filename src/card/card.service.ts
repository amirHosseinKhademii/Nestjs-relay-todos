import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card, CardConnection } from './types/card.types';
import { connectionFromArraySlice } from 'graphql-relay';
import { ConnectionArgs, getPagingParameters, nextId } from 'src/relay';
import { v4 as uuid } from 'uuid';
import { toGlobalId } from 'graphql-relay';
import { CreateCardInput, UpdateCardInput } from './types/card.input';
import { TodoService } from 'src/todo';
import { AddCardPayload } from './types/card.response';

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

  async addCard(input: CreateCardInput): Promise<AddCardPayload> {
    const guid = uuid();
    const id = toGlobalId('Card', guid);
    const card = await this.repo.create({ ...input, id });
    await this.todoService.updateCardsInTodoById({
      todoId: input.todoId,
      cardId: id,
    });
    const result = await this.repo.save(card);
    return {
      addCardEdge: {
        node: result,
        cursor: nextId(id).toString(),
      },
    } as any;
  }

  async updateCard(args: UpdateCardInput) {
    const { id, ...body } = args;
    const updated_at = new Date();
    Object.keys(body).forEach((key) => body[key] === null && delete body[key]);
    const todo = await this.repo.findOneByOrFail({ id });
    const updatedcard: Card = { ...todo, ...body, updated_at };
    const result = await this.repo.save(updatedcard);
    return { card: result };
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

  async deleteCardById(id: string) {
    return await this.repo.delete(id);
  }
}
