import { Type } from '@nestjs/common';
import {
  ObjectType,
  Field,
  InterfaceType,
  ID,
  ArgsOptions,
  ReturnTypeFunc,
  MutationOptions,
} from '@nestjs/graphql';
import * as Relay from 'graphql-relay';
import { InputMixin, PayloadMixin } from './input-arg-factory';

const typeMap = {};

@InterfaceType('Node')
export class NodeInterface {
  @Field(() => ID, {
    nullable: false,
  })
  id!: string;
}

export const typeNodeInterface = () => NodeInterface;

export const typeNodeInterfaces = () => [NodeInterface];

export const returnsNodeInterface = () => NodeInterface;

export const returnsNodeInterfaces = () => [NodeInterface];

export type ResolvedNode =
  | Promise<NodeInterface>
  | NodeInterface
  | Promise<null>
  | null
  | Promise<undefined>
  | undefined;

export type InputArgOptions = Omit<
  ArgsOptions,
  'name' | 'nullable' | 'type' | 'defaultValue'
>;

export const BASE_KEY = 'nestjs-relay';
export const METHOD_KEY = 'method';
export const METHOD_METADATA_KEY = `${BASE_KEY}:${METHOD_KEY}`;
export const CLASS_KEY = 'class';
export const CLASS_METADATA_KEY = `${BASE_KEY}:${CLASS_KEY}`;

export interface MethodIdentifier {
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object;
  key: string | symbol;
}

export interface ClassIdentifier {
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Function;
}

export type ClassMetadata = {
  name: string;
};

export type ParameterMetadata = Omit<ArgsOptions, 'type'> & {
  typeFunc: ReturnTypeFunc;
  paramIndex: number;
};

export type AnyConstructor<T = Record<string, unknown>> = new (
  ...args: any[]
) => T;

export type AnyFunction<A = any> = (...input: any[]) => A;

export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>;

export interface CreateInputTypeArgs {
  params: ParameterMetadata[];
  mutationName: string;
}

export type InputArgOptionsAsynConstructor = Pick<
  ArgsOptions,
  'type' | 'description'
> & {
  paramIndex: number;
};

export type InputMixin = Mixin<typeof InputMixin>;

export type PayloadMixin = Mixin<typeof PayloadMixin>;

export interface CreatePayloadTypeArgs {
  typeFunc: ReturnTypeFunc;
  mutationName: string;
}

export type RelayMutationOptions = Omit<MutationOptions, 'nullable'>;
