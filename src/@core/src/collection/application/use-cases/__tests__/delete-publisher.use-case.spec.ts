import { mock, MockProxy } from 'jest-mock-extended';
import { NotFoundError } from '#shared/domain';
import { DeletePublisherUseCase } from '#collection/application';
import { Publisher, PublisherRepository } from '#collection/domain';

describe('DeletePublisherUseCase Unit Tests', () => {
  let useCase: DeletePublisherUseCase.UseCase;
  let repository: MockProxy<PublisherRepository.Repository>

  beforeEach(() => {
    repository = mock()
    useCase = new DeletePublisherUseCase.UseCase(repository);
  });
  it('should throws error when entity not found', async () => {
    repository.delete.mockRejectedValue(new NotFoundError(`Entity Not Found using ID fake id`))
    await expect(() =>
      useCase.execute({id: 'fake id'})
    ).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));
  });

  it('should delete a publisher', async () => {
    const entity = Publisher.from({name: 'John'});
    repository.update.mockResolvedValue()
    repository.findById.mockResolvedValue(entity)
    const spyUpdate = jest.spyOn(repository, 'delete');

    await useCase.execute({id: entity.id});

    const id = repository.delete.mock.calls[0][0]
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(id).toEqual(entity.id)
  })
});
