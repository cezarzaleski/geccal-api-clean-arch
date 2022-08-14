import { CreateBookUseCase } from '@geccal/core/collection/application';

export class CreateBookDto implements CreateBookUseCase.Input {
  authors: Array<string>;
  createdAt: Date;
  edition: string;
  exemplary: number;
  name: string;
  note: string;
  origin: string;
  publisherId: string;
  status: string;
}
