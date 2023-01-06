import {
  ClassIdentifier,
  ClassMetadata,
  CLASS_METADATA_KEY,
  MethodIdentifier,
  METHOD_METADATA_KEY,
  ParameterMetadata,
} from './relay.types';

export class MetadataStorage {
  static addMethodMetadata(args: MethodIdentifier & ParameterMetadata): void {
    const { target, key, ...data } = args;
    const existingMetadata = MetadataStorage.getMethodMetadata({ target, key });
    const metadata = [...existingMetadata, data];
    Reflect.defineMetadata(METHOD_METADATA_KEY, metadata, target, key);
  }

  static getMethodMetadata({
    target,
    key,
  }: MethodIdentifier): ParameterMetadata[] {
    return Reflect.getMetadata(METHOD_METADATA_KEY, target, key) || [];
  }

  static addClassMetadata(args: ClassIdentifier & ClassMetadata): void {
    const { target, ...data } = args;
    const existingMetadata = MetadataStorage.getClassMetadata({ target });
    const metadata = { ...existingMetadata, ...data };
    Reflect.defineMetadata(CLASS_METADATA_KEY, metadata, target);
  }

  static getClassMetadata({ target }: ClassIdentifier): ClassMetadata {
    return Reflect.getMetadata(CLASS_METADATA_KEY, target);
  }
}
