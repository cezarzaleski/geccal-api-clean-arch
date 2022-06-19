import UpdateBookUseCase from '@geccal/core/dist/collection/application/use-cases/update-book.use-case';

export class UpdateBookDto implements UpdateBookUseCase.Input {
  authors: Array<string>;
  createdAt: Date;
  edition: string;
  exemplary: number;
  id: string;
  name: string;
  note: string;
  origin: string;
  publisherId: string;
  status: string;
}
