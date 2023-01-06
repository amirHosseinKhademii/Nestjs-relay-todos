import { ObjectTypeOptions, ObjectType } from '@nestjs/graphql';
import { NodeInterface } from '../relay.types';

export function NodeType(name?: string): ClassDecorator {
  return (target: Function) => {
    const interfaces = [];

    const nodeOptions: ObjectTypeOptions = {
      implements: interfaces.concat(NodeInterface as never),
    };

    ObjectType(name, nodeOptions)(target);
  };
}
