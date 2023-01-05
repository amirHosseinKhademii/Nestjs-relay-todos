import { ObjectTypeOptions, ObjectType } from '@nestjs/graphql';
import { NodeInterface } from './app.resolver';

export function NodeType(name?: string): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Function) => {
    const interfaces = [];

    const nodeOptions: ObjectTypeOptions = {
      implements: interfaces.concat(NodeInterface as never),
    };

    ObjectType(name, nodeOptions)(target);
  };
}
