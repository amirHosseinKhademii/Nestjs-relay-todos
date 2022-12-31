import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field({ nullable: true, description: 'Paginate first' })
  public page?: number;

  @Field({ nullable: true, description: 'Paginate last' })
  public limit?: number;

  @Field({ nullable: true, description: 'Starting date' })
  public start_date?: string;

  @Field({ nullable: true, description: 'Ending date' })
  public end_date?: string;
}
