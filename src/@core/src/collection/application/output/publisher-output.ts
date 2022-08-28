import { Publisher } from '#collection/domain';


export type PublisherOutput = {
  id: string;
  name: string;
  active: boolean;
  createdAt: Date;
};

export class PublisherOutputMapper {
  static toOutput(entity: Publisher): PublisherOutput {
    return {
      id: entity.id,
      name: entity.name,
      active: entity.active,
      createdAt: entity.createdAt
    }
  }
}
