import { default as DefaultUseCase } from '#shared/application/use-case';
import { BookRepository } from '#collection/domain/repository';
import { Book } from '#collection/domain';
import { BookOutput, BookOutputMapper } from '../output/book-output';
import { isEmpty } from '#shared/domain';
import StatusBook from '#collection/domain/entities/status-book.vo';

export namespace CreateBookUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private bookRepository: BookRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = Book.from({
        name: input.name,
        exemplary: input.exemplary,
        status: StatusBook.AVAILABLE.toString(),
        edition: input.edition,
        year: input.year,
        publisherId: input.publisherId,
        authors: input.authors,
        origin: input.origin,
        createdAt: isEmpty(input.createdAt) ? null : new Date(input.createdAt),
        updatedAt: isEmpty(input.updatedAt) ? null : new Date(input.updatedAt),
      });
      await this.bookRepository.insert(entity);
      return BookOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    name: string
    exemplary: number
    edition: string
    year: number
    publisherId: string
    authors: Array<string>
    origin: string
    createdAt?: string;
    updatedAt?: string;
  };

  export type Output = BookOutput;

}
export default CreateBookUseCase;
