import { default as DefaultUseCase } from '#shared/application/use-case';
import { AutorRepository } from '#acervo/autor/domain';
import { AutorOutput, AutorOutputMapper } from '#acervo/autor/application';
import { PaginationOutputDto, PaginationOutputMapper, SearchInputDto } from '#shared/application';

export namespace ListAutoresUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private autorRepository: AutorRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new AutorRepository.SearchParams(input);
      const searchResult = await this.autorRepository.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: AutorRepository.SearchResult): Output {
      const items = searchResult.items.map((i) => {
        return AutorOutputMapper.toOutput(i);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }

  export type Input = SearchInputDto;
  export type Output = PaginationOutputDto<AutorOutput>;

}

export default ListAutoresUseCase;