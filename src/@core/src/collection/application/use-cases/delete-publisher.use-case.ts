import { default as DefaultUseCase } from '#shared/application/use-case';
import { PublisherRepository } from '#collection/domain';

export namespace DeletePublisherUseCase{
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private publisherRepository: PublisherRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.publisherRepository.delete(input.id);
    }
  }

  export type Input = {
    id: string;
  };
  export type Output = void;
}

export default DeletePublisherUseCase;
