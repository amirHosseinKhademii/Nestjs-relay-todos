import { ArgsType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/args';

@ArgsType()
export class GetTodosArgs extends PaginationArgs {}
