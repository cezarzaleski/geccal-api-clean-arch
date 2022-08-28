import { mock, MockProxy } from 'jest-mock-extended';
import { NotFoundError } from '#shared/domain';
import { GetPublisherUseCase } from '#collection/application';
import { Publisher, PublisherRepository } from '#collection/domain';

describe('GetPublisherUseCase Unit Tests', () => {
  let useCase: GetPublisherUseCase.UseCase;
  let repository: MockProxy<PublisherRepository.Repository>

  beforeEach(() => {
    repository = mock()
    useCase = new GetPublisherUseCase.UseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    repository.findById.mockRejectedValue(new NotFoundError(`Entity Not Found using ID fake id`))
    await expect(() =>
      useCase.execute({id: 'fake id'})
    ).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));
  });

  it('should returns a publisher', async () => {
    const item = Publisher.from({name: 'Maria', active: true});
    repository.findById.mockResolvedValue(item)
    const spyFindById = jest.spyOn(repository, 'findById');
    const output = await useCase.execute({id: item.id});
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: item.id,
      name: 'Maria',
      createdAt: item.createdAt,
      active: true
    });
  });
});
