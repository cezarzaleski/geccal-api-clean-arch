import { default as DefaultUseCase } from '#shared/application/use-case';
import { PaginationOutputDto, PaginationOutputMapper, SearchInputDto } from '#shared/application';
import { PublisherRepository } from '#collection/domain';
import { PublisherOutput, PublisherOutputMapper } from '#collection/application';

export namespace ListPublishersUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private publisherRepository: PublisherRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new PublisherRepository.SearchParams(input);
      const searchResult = await this.publisherRepository.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: PublisherRepository.SearchResult): Output {
      const items = searchResult.items.map((i) => {
        return PublisherOutputMapper.toOutput(i);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }

  export type Input = SearchInputDto;
  export type Output = PaginationOutputDto<PublisherOutput>;

}

export default ListPublishersUseCase;
