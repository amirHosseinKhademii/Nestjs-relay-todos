import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectionArgs, nextId } from 'src/relay';
import { findAll } from 'src/services';
import { Repository } from 'typeorm';
import {
  CreateMessageInput,
  Message,
  MessageConnection,
  MessagesQuery,
} from './types';
import { AddMessagePayload } from './types/message.response';
import { v4 as uuid } from 'uuid';
import { toGlobalId } from 'graphql-relay';

@Injectable()
export class MessageService {
  constructor(@InjectRepository(Message) private repo: Repository<Message>) {}

  async findAllMessages(
    args: ConnectionArgs,
    { chatId }: MessagesQuery,
  ): Promise<MessageConnection> {
    return await findAll(args, this.repo, { chatId: chatId });
  }

  async addMessage(
    args: CreateMessageInput,
    user: string,
  ): Promise<AddMessagePayload> {
    const guid = uuid();
    const id = toGlobalId('Message', guid);
    const message = await this.repo.create({
      ...args,
      id,
      user,
    });
    const result = await this.repo.save(message);
    return {
      addMessageEdge: {
        node: result,
        cursor: nextId(id).toString(),
      },
    } as any;
  }
}
