import { default as DefaultUseCase } from '#shared/application/use-case';
import { PublisherRepository } from '#collection/domain';
import { PublisherOutput, PublisherOutputMapper } from '#collection/application';

export namespace UpdatePublisherUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private publisherRepository: PublisherRepository.Repository
    ) {}

    async execute(input: Input): Promise<Output> {
      const publisher = await this.publisherRepository.findById(input.id);
      publisher.update(input.name);
      await this.publisherRepository.update(publisher);
      return PublisherOutputMapper.toOutput(publisher);
    }
  }

  export type Input = {
    id: string;
    name: string;
    ativo?: boolean;
  };

  export type Output = PublisherOutput;

}
export default UpdatePublisherUseCase;
