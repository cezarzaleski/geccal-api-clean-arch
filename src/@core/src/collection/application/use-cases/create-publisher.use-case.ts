import { default as DefaultUseCase } from '#shared/application/use-case';
import { Publisher, PublisherRepository } from '#collection/domain';
import { PublisherOutput, PublisherOutputMapper } from '#collection/application';
import { isEmpty } from '#shared/domain';

export namespace CreatePublisherUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private publisherRepository: PublisherRepository.Repository) {
    }

    async execute(input: Input): Promise<Output> {
      delete input.createdAt
      const entity = Publisher.from({
        name: input.name,
        active: input.active,
        createdAt: isEmpty(input.createdAt) ? null : new Date(input.createdAt),
        updatedAt: isEmpty(input.updatedAt) ? null : new Date(input.updatedAt)
      });
      await this.publisherRepository.insert(entity);
      return PublisherOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    name: string;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };

  export type Output = PublisherOutput;

}
export default CreatePublisherUseCase;
