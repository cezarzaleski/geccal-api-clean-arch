import { default as DefaultUseCase } from '#shared/application/use-case';
import { BookRepository } from '#collection/domain/repository';
import { Book } from '#collection/domain';
import { BookOutput, BookOutputMapper } from '#collection/application/dto/book-output';

export namespace CreateBookUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private livroRepository: BookRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = Book.from(input);
      await this.livroRepository.insert(entity);
      return BookOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
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
export default CreateBookUseCase;
