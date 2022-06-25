import { Publisher } from '#collection/domain';


export type PublisherOutput = {
  id: string;
  name: string;
  ativo: boolean;
  createdAt: Date;
};

export class PublisherOutputMapper {
  static toOutput(entity: Publisher): PublisherOutput {
    return {
      id: entity.id,
      name: entity.name,
      ativo: entity.ativo,
      createdAt: entity.createdAt
    }
  }
}
