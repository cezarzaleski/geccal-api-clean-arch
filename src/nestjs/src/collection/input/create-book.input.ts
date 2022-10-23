import { CreateBookUseCase } from '@geccal/core/collection/application';

export class CreateBookInput implements CreateBookUseCase.Input {
  authors: Array<string>;
  edition: string;
  exemplary: number;
  name: string;
  year: number;
  origin: string;
  publisherId: string;
  createdAt?: string;
  updatedAt?: string;
}
