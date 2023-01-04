import { Type } from '@nestjs/common';
import { Resolver, Parent, Info } from '@nestjs/graphql';
import { GraphQLObjectType } from 'graphql';

import { ResolveField, FieldOptions } from '@nestjs/graphql';

export type GlobalIdFieldOptions = Pick<FieldOptions, 'complexity'>;

export const GlobalIdField = (options?: GlobalIdFieldOptions) =>
  ResolveField(typeResolvedGlobalId, {
    name: 'id',
    nullable: false,
    ...options,
  });

interface RelayResolvedGlobalId {
  type: string;
  id: string;
}

export class ResolvedGlobalId implements RelayResolvedGlobalId {
  type!: string;
  id!: string;

  constructor(args: RelayResolvedGlobalId) {
    this.type = args.type;
    this.id = args.id;
  }

  toString() {
    return this.id;
  }

  toNumber() {
    return Number(this.id);
  }
}

export const typeResolvedGlobalId = () => ResolvedGlobalId;

export const typeResolvedGlobalIds = () => [ResolvedGlobalId];

export type GlobalId = ResolvedGlobalId | string | number;

export interface ResolverParent {
  id: GlobalId;
}

export interface ResolverInfo {
  parentType: Pick<GraphQLObjectType, 'name'>;
}

export interface GlobalIdFieldResolver {
  id(parent: ResolverParent | null, info: ResolverInfo): ResolvedGlobalId;
}

export function GlobalIdFieldResolver<T>(
  classRef: Type<T>,
  idFieldOptions?: GlobalIdFieldOptions,
): Type<GlobalIdFieldResolver> {
  const globalIdFieldOptions = idFieldOptions || {};

  @Resolver(classRef, { isAbstract: true })
  abstract class GlobalIdFieldResolverHost {
    @GlobalIdField(globalIdFieldOptions)
    id(
      @Parent() parent: ResolverParent,
      @Info() info: ResolverInfo,
    ): ResolvedGlobalId {
      if (!parent || !parent.id) {
        throw new Error(
          `Cannot resolve id when 'parent' or 'parent.id' is null`,
        );
      }
      switch (typeof parent.id) {
        case 'object':
          return parent.id;
        case 'string':
          return new ResolvedGlobalId({
            type: info.parentType.name,
            id: parent.id,
          });
        case 'number':
          return new ResolvedGlobalId({
            type: info.parentType.name,
            id: parent.id.toString(),
          });
      }
    }
  }
  return GlobalIdFieldResolverHost as Type<GlobalIdFieldResolver>;
}
