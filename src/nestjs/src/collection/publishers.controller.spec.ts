import { mock, MockProxy } from 'jest-mock-extended';
import { CreatePublisherUseCase, UpdatePublisherUseCase, } from '@geccal/core/collection/application';
import { CreatePublisherInput } from './input/create-publisher.input';
import { UpdatePublisherInput } from './input/update-publisher.input';
import { PublishersController } from './publisher.controller';

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
});
