import { default as DefaultUseCase } from '#shared/application/use-case';
import { Publisher, PublisherRepository } from '#collection/domain';
import { PublisherOutput, PublisherOutputMapper } from '#collection/application';

export namespace CreatePublisherUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private publisherRepository: PublisherRepository.Repository) {
    }

    async execute(input: Input): Promise<Output> {
      const entity = Publisher.from(input);
      await this.publisherRepository.insert(entity);
      return PublisherOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    name: string;
    ativo?: boolean;
  };

  export type Output = PublisherOutput;

}
export default CreatePublisherUseCase;
