import { ObjectTypeOptions, ObjectType } from '@nestjs/graphql';
import { NodeInterface } from './app.resolver';

export function NodeType(): ClassDecorator;

export function NodeType(
  name: string,
  options?: ObjectTypeOptions,
): ClassDecorator;

export function NodeType(
  name?: string,
  objectTypeOptions?: ObjectTypeOptions,
): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Function) => {
    const interfaces = [];

    const nodeOptions: ObjectTypeOptions = {
      implements: interfaces.concat(NodeInterface as never),
    };

    ObjectType(name, nodeOptions)(target);
  };
}
