import { default as DefaultUseCase } from '#shared/application/use-case';
import { BookRepository } from '#collection/domain';
import { BookOutput, BookOutputMapper } from '#collection/application';

export namespace UpdateBookUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private bookRepository: BookRepository.Repository
    ) {}

    async execute(input: Input): Promise<Output> {
      const book = await this.bookRepository.findById(input.id);
      book.update({...input});
      await this.bookRepository.update(book);
      return BookOutputMapper.toOutput(book);
    }
  }

  export type Input = {
    id: string;
    nome: string
    exemplar: number
    situacao: string
    edicao: string
    observacao: string
    editoraId: string
    autores: Array<string>
    origem: string
    criadoEm: Date
  };

  export type Output = BookOutput;

}
export default UpdateBookUseCase;
