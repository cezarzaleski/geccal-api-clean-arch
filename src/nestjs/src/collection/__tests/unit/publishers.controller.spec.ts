import { mock, MockProxy } from 'jest-mock-extended';
import {
  CreatePublisherUseCase,
  GetPublisherUseCase,
  ListPublishersUseCase,
  UpdatePublisherUseCase,
  DeletePublisherUseCase
} from '@geccal/core/collection/application';
import { CreatePublisherInput } from '../../input/create-publisher.input';
import { UpdatePublisherInput } from '../../input/update-publisher.input';
import { PublishersController } from '../../publisher.controller';
import { SortDirection } from '@geccal/core/@shared/domain';

describe('PublishersController', () => {
  let controller: PublishersController;
  let createUseCase: MockProxy<CreatePublisherUseCase.UseCase>
  let updateUseCase: MockProxy<UpdatePublisherUseCase.UseCase>
  let deleteUseCase: MockProxy<DeletePublisherUseCase.UseCase>
  let getUseCase: MockProxy<GetPublisherUseCase.UseCase>
  let listUseCase: MockProxy<ListPublishersUseCase.UseCase>

  beforeEach(async () => {
    createUseCase = mock()
    updateUseCase = mock()
    deleteUseCase = mock()
    getUseCase = mock()
    listUseCase = mock()
    controller = new PublishersController(
      createUseCase,
      updateUseCase,
      deleteUseCase,
      getUseCase,
      listUseCase
    );
  });

  it('should create a publisher', async () => {
    const expectedOutput: Omit<CreatePublisherUseCase.Output, 'id'> = {
      name: 'publisher',
      ativo: true
    };
    createUseCase.execute.mockReturnValue(Promise.resolve(expectedOutput))
    const input: MockProxy<CreatePublisherInput> = mock();
    const output = await controller.create(input);
    expect(createUseCase.execute).toHaveBeenCalledWith(input);
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should update a publisher', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const expectedOutput: UpdatePublisherUseCase.Output = {
      id,
      name: 'publisher',
      ativo: true
    };
    updateUseCase.execute.mockReturnValue(Promise.resolve(expectedOutput))
    const input: MockProxy<UpdatePublisherInput> = mock();
    const output = await controller.update(id, input);
    expect(updateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should get a publisher by ID', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const expectedOutput: GetPublisherUseCase.Output = {
      id,
      name: 'publisher',
      ativo: true
    };
    getUseCase.execute.mockReturnValue(Promise.resolve(expectedOutput))
    const output = await controller.findOne(id);
    expect(getUseCase.execute).toHaveBeenCalledWith({ id});
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
    listUseCase.execute.mockReturnValue(Promise.resolve(expectedOutput))
    const searchParams = {
      page: 1,
      perPage: 2,
      sort: 'name',
      sortDir: 'desc' as SortDirection,
      filter: 'test',
    };
    const output = await controller.search(searchParams);
    expect(expectedOutput).toStrictEqual(output);
  })

  it('should delete a publisher by ID', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const expectedOutput = undefined
    deleteUseCase.execute.mockReturnValue(Promise.resolve(expectedOutput))
    const output = await controller.remove(id);
    expect(expectedOutput).toStrictEqual(output);
  })
});
