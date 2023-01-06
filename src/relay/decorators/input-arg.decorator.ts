import { ReturnTypeFunc } from '@nestjs/graphql';
import { MetadataStorage } from '../metadata-storage';
import { InputArgOptions } from '../relay.types';

export function InputArg<T>(
  typeFunc: ReturnTypeFunc,
  options?: InputArgOptions,
): ParameterDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object, key: string | symbol, paramIndex: number) => {
    MetadataStorage.addMethodMetadata({
      ...options,
      typeFunc,
      target,
      key,
      paramIndex,
    });
  };
}
