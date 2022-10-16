import { CreateBookUseCase } from '@geccal/core/collection/application';

export class CreateBookInput implements CreateBookUseCase.Input {
  authors: Array<string>;
  createdAt: Date;
  edition: string;
  exemplary: number;
  name: string;
  year: number;
  origin: string;
  publisherId: string;
  status: string;
}
