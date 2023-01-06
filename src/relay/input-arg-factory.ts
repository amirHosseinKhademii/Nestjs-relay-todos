import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  AnyConstructor,
  CreateInputTypeArgs,
  InputArgOptionsAsynConstructor,
} from './relay.types';

export const capitalise = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const getInputName = (mutationName: string): string =>
  capitalise(mutationName) + 'Input';

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

export class InputArgFactory {
  static create(args: CreateInputTypeArgs): InputArgOptionsAsynConstructor {
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
