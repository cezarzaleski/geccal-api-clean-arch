import { Publisher } from '#collection/domain';


export type PublisherOutput = {
  id: string;
  name: string;
  createdAt: Date;
};

export class PublisherOutputMapper {
  static toOutput(entity: Publisher): PublisherOutput {
    return {
      id: entity.id,
      name: entity.name,
      createdAt: entity.createdAt
    }
  }
}
