import { default as DefaultUseCase } from '#shared/application/use-case';
import { PublisherRepository } from '#collection/domain';
import { PublisherOutput, PublisherOutputMapper } from '#collection/application';

export namespace GetPublisherUseCase{
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private publisherRepository: PublisherRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.publisherRepository.findById(input.id);
      return PublisherOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: string;
  };
  export type Output = PublisherOutput;
}

export default GetPublisherUseCase;
