import { CreatePublisherUseCase } from '@geccal/core/collection/application';


export class CreatePublisherInput implements CreatePublisherUseCase.Input {
  name: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
