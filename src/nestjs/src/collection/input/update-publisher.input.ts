import { UpdatePublisherUseCase } from '@geccal/core/collection/application';

export class UpdatePublisherInput implements Omit<UpdatePublisherUseCase.Input, 'id'> {
  name: string;
  ativo?: boolean;
}
