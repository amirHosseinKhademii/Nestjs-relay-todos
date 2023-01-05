import { ArgsOptions, Field, InputType, ObjectType } from '@nestjs/graphql';

import { ParameterMetadata } from './metadata-storage';

export const capitalise = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const getInputName = (mutationName: string): string =>
  capitalise(mutationName) + 'Input';

export type InputMixin = Mixin<typeof InputMixin>;

export function InputMixin<TBase extends AnyConstructor>(
  base: TBase,
  mutationName: string,
) {
  const name = getInputName(mutationName);

  @InputType(name)
  class Input extends base {
    @Field({
      name: 'clientMutationId',
      nullable: true,
    })
    clientMutationId?: string;
  }

  return Input;
}

export type AnyConstructor<T = Record<string, unknown>> = new (
  ...args: any[]
) => T;

export type AnyFunction<A = any> = (...input: any[]) => A;

export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>;

export interface CreateInputTypeArgs {
  params: ParameterMetadata[];
  mutationName: string;
}

export type InputArgOptions = Pick<ArgsOptions, 'type' | 'description'> & {
  paramIndex: number;
};

export class InputArgFactory {
  static create(args: CreateInputTypeArgs): InputArgOptions {
    if (args.params.length === 0) {
      /**
       * No parameters registered
       * -> Do not create input type for this mutation
       */
      throw new Error(
        `Not detected any RelayArg declarations in ${args.mutationName}.`,
      );
    }

    if (args.params.length > 1) {
      /**
       * Throw error that multiple inputs have been registered
       */
      throw new Error(
        `Detected multiple RelayArg declarations in ${args.mutationName}.`,
      );
    }

    /**
     * Single argument
     * Is an input type
     * -> Add the clientMutationId field
     */
    const param = args.params[0];

    const type = param.typeFunc() as AnyConstructor;
    const inputType = InputMixin(type, args.mutationName);

    return {
      type: () => inputType,
      paramIndex: param.paramIndex,
      description: param.description,
    };
  }
}

export const getPayloadName = (mutationName: string): string =>
  capitalise(mutationName) + 'Payload';

export type PayloadMixin = Mixin<typeof PayloadMixin>;

export function PayloadMixin<TBase extends AnyConstructor>(
  base: TBase,
  mutationName: string,
) {
  const name = getPayloadName(mutationName);

  @ObjectType(name)
  class Payload extends base {
    @Field({
      name: 'clientMutationId',
      nullable: true,
    })
    clientMutationId?: string;
  }

  return Payload;
}
