import { default as DefaultUseCase } from '#shared/application/use-case';
import { BookRepository } from '#collection/domain/repository';
import { Book } from '#collection/domain';
import { BookOutput, BookOutputMapper } from '../output/book-output';

export namespace CreateBookUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private bookRepository: BookRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = Book.from(input);
      await this.bookRepository.insert(entity);
      return BookOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    name: string
    exemplary: number
    status: string
    edition: string
    note: string
    publisherId: string
    authors: Array<string>
    origin: string
    createdAt: Date
  };

  export type Output = BookOutput;

}
export default CreateBookUseCase;
