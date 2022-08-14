import { CreatePublisherUseCase } from '@geccal/core/collection/application';


export class CreatePublisherInput implements CreatePublisherUseCase.Input {
  name: string;
  ativo?: boolean;
}
