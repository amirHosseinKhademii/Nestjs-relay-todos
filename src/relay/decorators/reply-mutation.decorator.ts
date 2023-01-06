import {
  ReturnTypeFunc,
  MutationOptions,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { InputArgFactory, PayloadMixin } from '../input-arg-factory';

import { MetadataStorage } from '../metadata-storage';
import {
  AnyConstructor,
  CreatePayloadTypeArgs,
  RelayMutationOptions,
} from '../relay.types';

export const isPromise = <T>(
  maybePromise: T | Promise<T>,
): maybePromise is Promise<T> =>
  Boolean(typeof (maybePromise as any)?.then === 'function');

export const ensurePromise = <T>(maybePromise: T | Promise<T>) =>
  isPromise(maybePromise) ? maybePromise : Promise.resolve(maybePromise);

export const getClientMutationId = (args: any[]): string => {
  const relayArgIndex = args.findIndex((arg) => arg['clientMutationId']);
  return args[relayArgIndex]?.clientMutationId || null;
};

export class PayloadTypeFactory {
  static create(args: CreatePayloadTypeArgs): AnyConstructor {
    const type = args.typeFunc() as AnyConstructor;
    const payloadType = PayloadMixin(type, args.mutationName);
    return payloadType;
  }
}

export function RelayMutation<T>(
  typeFunc: ReturnTypeFunc,
  options?: RelayMutationOptions,
): MethodDecorator {
  return (
    target: Record<string, any>,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const mutationName = options?.name ? options.name : String(key);

    /**
     * Resolver Interceptor
     */
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const clientMutationId = getClientMutationId(args);
      const methodResult = await ensurePromise(
        originalMethod.apply(this, args),
      );
      return { ...methodResult, clientMutationId };
    };

    /**
     * Input Type
     */
    const params = MetadataStorage.getMethodMetadata({ target, key });
    const { paramIndex, ...argOptions } = InputArgFactory.create({
      params,
      mutationName,
    });
    const inputArgOptions = {
      name: 'input',
      nullable: false,
      ...argOptions,
    };
    Args(inputArgOptions)(target, key, paramIndex);

    /**
     * Payload Type
     */
    const payloadType = PayloadTypeFactory.create({ typeFunc, mutationName });
    const mutationOptions: MutationOptions = {
      ...options,
      name: mutationName,
      nullable: true,
    };
    Mutation(() => payloadType, mutationOptions)(target, key, descriptor);
  };
}
