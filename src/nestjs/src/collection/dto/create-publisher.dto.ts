import { CreatePublisherUseCase } from '@geccal/core/collection/application';


export class CreatePublisherDto implements CreatePublisherUseCase.Input {
  name: string;
  ativo?: boolean;
}
