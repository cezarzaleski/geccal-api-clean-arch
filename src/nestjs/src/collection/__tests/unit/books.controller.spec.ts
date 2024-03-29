import { mock, MockProxy } from 'jest-mock-extended';
import {
  CreateBookUseCase,
  UpdateBookUseCase,
} from '@geccal/core/collection/application';
import { PublisherId } from '@geccal/core/collection/domain';
import { CreateBookInput } from '../../input/create-book.input';
import { UpdateBookInput } from '../../input/update-book.input';
import { BooksController } from '../../books.controller';

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    controller = new BooksController();
  });

  it('should create a book', async () => {
    // @ts-expect-error ignore the error
    const publisherId = new PublisherId().value;
    const expectedOutput: Omit<CreateBookUseCase.Output, 'id'> = {
      authors: ['luiz', 'marias'],
      createdAt: new Date(),
      edition: '1ª',
      exemplary: 1,
      origin: 'doacao',
      publisherId: publisherId,
      name: 'livro',
      status: 'disponivel',
      year: 2022,
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    // @ts-expect-error ignore the error
    controller['createUseCase'] = mockCreateUseCase;
    const input: MockProxy<CreateBookInput> = mock();
    const output = await controller.create(input);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should update a book', async () => {
    // @ts-expect-error ignore the error
    const publisherId = new PublisherId().value;
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const expectedOutput: UpdateBookUseCase.Output = {
      id,
      authors: ['luiz', 'marias'],
      createdAt: new Date(),
      edition: '1ª',
      exemplary: 1,
      origin: 'doacao',
      publisherId: publisherId,
      name: 'livro',
      status: 'disponivel',
      year: 2022,
    };
    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    // @ts-expect-error ignore the error
    controller['updateUseCase'] = mockUpdateUseCase;
    const input: MockProxy<UpdateBookInput> = mock();
    const output = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    expect(expectedOutput).toStrictEqual(output);
  });
});
