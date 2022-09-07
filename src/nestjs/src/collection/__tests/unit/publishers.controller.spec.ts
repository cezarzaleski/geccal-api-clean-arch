import { mock, MockProxy } from 'jest-mock-extended';
import {
  CreatePublisherUseCase,
  GetPublisherUseCase,
  ListPublishersUseCase,
  UpdatePublisherUseCase
} from '@geccal/core/collection/application';
import { CreatePublisherInput } from '../../input/create-publisher.input';
import { UpdatePublisherInput } from '../../input/update-publisher.input';
import { PublishersController } from '../../publisher.controller';
import { SortDirection } from '@geccal/core/@shared/domain';

describe('PublishersController', () => {
  let controller: PublishersController;

  beforeEach(async () => {
    controller = new PublishersController();
  });

  it('should create a publisher', async () => {
    const expectedOutput: Omit<CreatePublisherUseCase.Output, 'id'> = {
      name: 'publisher',
      ativo: true
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    // @ts-expect-error ignore the error
    controller['createUseCase'] = mockCreateUseCase;
    const input: MockProxy<CreatePublisherInput> = mock();
    const output = await controller.create(input);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should update a publisher', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const expectedOutput: UpdatePublisherUseCase.Output = {
      id,
      name: 'publisher',
      ativo: true
    };
    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    // @ts-expect-error ignore the error
    controller['updateUseCase'] = mockUpdateUseCase;
    const input: MockProxy<UpdatePublisherInput> = mock();
    const output = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should get a publisher by ID', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const expectedOutput: GetPublisherUseCase.Output = {
      id,
      name: 'publisher',
      ativo: true
    };
    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    // @ts-expect-error ignore the error
    controller['getUseCase'] = mockGetUseCase;
    const output = await controller.findOne(id);
    expect(mockGetUseCase.execute).toHaveBeenCalledWith({ id});
    expect(expectedOutput).toStrictEqual(output);
  })

  it('should list publishers', async () => {
    const expectedOutput: ListPublishersUseCase.Output = {
      items: [
        {
          id: '9366b7dc-2d71-4799-b91c-c64adb205104',
          name: 'publisher',
          ativo: true,
          createdAt: new Date(),
        }
      ],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    };
    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    // @ts-expect-error ignore the error
    controller['listUseCase'] = mockListUseCase;
    const searchParams = {
      page: 1,
      perPage: 2,
      sort: 'name',
      sortDir: 'desc' as SortDirection,
      filter: 'test',
    };
    const output = await controller.search(searchParams);
    expect(mockListUseCase.execute).toHaveBeenCalledWith(searchParams);
    expect(expectedOutput).toStrictEqual(output);
  })

  it('should delete a publisher by ID', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const expectedOutput = undefined
    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    // @ts-expect-error ignore the error
    controller['deleteUseCase'] = mockDeleteUseCase;
    const output = await controller.remove(id);
    expect(mockDeleteUseCase.execute).toHaveBeenCalledWith({ id});
    expect(expectedOutput).toStrictEqual(output);
  })
});
