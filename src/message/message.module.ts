import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './types';
import { UserModule } from 'src/user';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UserModule],
  providers: [MessageService, MessageResolver],
})
export class MessageModule {}
