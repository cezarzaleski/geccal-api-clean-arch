import { mock, MockProxy } from 'jest-mock-extended';
import { NotFoundError } from '#shared/domain';
import { UpdatePublisherUseCase } from '#collection/application';
import { Publisher, PublisherRepository } from '#collection/domain';

describe('UpdatePublisherUseCase Unit Tests', () => {
  let useCase: UpdatePublisherUseCase.UseCase;
  let repository: MockProxy<PublisherRepository.Repository>
  let publisher: any

  beforeEach(() => {
    repository = mock()
    useCase = new UpdatePublisherUseCase.UseCase(repository);
  });
  it('should throws error when entity not found', async () => {
    repository.findById.mockRejectedValue(new NotFoundError(`Entity Not Found using ID fake id`))
    await expect(() =>
      useCase.execute({id: 'fake id', name: 'fake'})
    ).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));
  });

  it('should update a publisher', async () => {
    const entity = Publisher.from({name: 'John'});
    repository.update.mockResolvedValue()
    repository.findById.mockResolvedValue(entity)
    const spyUpdate = jest.spyOn(repository, 'update');

    let output = await useCase.execute({id: entity.id, name: 'update'});

    publisher = repository.update.mock.calls[0][0]
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: publisher.id,
      name: 'update',
      ativo: publisher.ativo,
      createdAt: publisher.createdAt,
    });
  })
});
