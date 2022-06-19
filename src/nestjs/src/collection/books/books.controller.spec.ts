import { Test, TestingModule } from '@nestjs/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { BooksController } from './books.controller';
import {
  CreateBookUseCase,
  UpdateBookUseCase,
} from '@geccal/core/collection/application';
import { PublisherId } from '@geccal/core/collection/domain';
import { CreateBookDto } from 'src/collection/books/dto/create-book.dto';
import { UpdateBookDto } from 'src/collection/books/dto/update-book.dto';

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should create a book', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const publisherId = new PublisherId().value;
    const expectedOutput: CreateBookUseCase.Output = {
      authors: ['luiz', 'marias'],
      createdAt: new Date(),
      edition: '1ª',
      exemplary: 1,
      origin: 'doacao',
      publisherId: publisherId,
      name: 'livro',
      status: 'disponivel',
      note: 'note',
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    controller['createUseCase'] = mockCreateUseCase;
    const input: MockProxy<CreateBookDto> = mock();
    const output = await controller.create(input);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should update a book', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
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
      note: 'note',
    };
    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    controller['updateUseCase'] = mockUpdateUseCase;
    const input: MockProxy<UpdateBookDto> = mock();
    const output = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    expect(expectedOutput).toStrictEqual(output);
  });
});
