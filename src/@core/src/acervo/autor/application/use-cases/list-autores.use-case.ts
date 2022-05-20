import { default as DefaultUseCase } from '../../../../@shared/application/use-case';
import { SearchInputDto } from '../../../../@shared/application/dto/search-input';
import { PaginationOutputDto, PaginationOutputMapper, } from '../../../../@shared/application/dto/pagination-output';
import { AutorRepository } from '../../domain/repository';
import { AutorOutput, AutorOutputMapper } from '../dto';

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