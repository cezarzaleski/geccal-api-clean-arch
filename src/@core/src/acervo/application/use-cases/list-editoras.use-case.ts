import { default as DefaultUseCase } from '#shared/application/use-case';
import { PaginationOutputDto, PaginationOutputMapper, SearchInputDto } from '#shared/application';
import { EditoraOutput, EditoraOutputMapper } from '#acervo/application/dto/editora-output';
import { EditoraRepository } from '#acervo/domain';

export namespace ListEditorasUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private editoraRepository: EditoraRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new EditoraRepository.SearchParams(input);
      const searchResult = await this.editoraRepository.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: EditoraRepository.SearchResult): Output {
      const items = searchResult.items.map((i) => {
        return EditoraOutputMapper.toOutput(i);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }

  export type Input = SearchInputDto;
  export type Output = PaginationOutputDto<EditoraOutput>;

}

export default ListEditorasUseCase;
