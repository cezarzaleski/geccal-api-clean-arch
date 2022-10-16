import { UpdateBookUseCase } from '@geccal/core/collection/application';

export class UpdateBookInput implements Omit<UpdateBookUseCase.Input, 'id'> {
  authors: Array<string>;
  createdAt: Date;
  edition: string;
  exemplary: number;
  id: string;
  name: string;
  year: number;
  origin: string;
  publisherId: string;
  status: string;
}
