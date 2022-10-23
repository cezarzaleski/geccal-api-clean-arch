import { mock, MockProxy } from 'jest-mock-extended';
import { CreatePublisherUseCase } from '#collection/application';
import { PublisherRepository } from '#collection/domain';

describe('CreatePublisherUseCase Unit Tests', () => {
  let useCase: CreatePublisherUseCase.UseCase;
  let repository: MockProxy<PublisherRepository.Repository>
  let publisher: any

  beforeEach(() => {
    repository = mock()
    useCase = new CreatePublisherUseCase.UseCase(repository);
  });


  it('should create a publisher', async () => {
    repository.insert.mockResolvedValue()
    const spyInsert = jest.spyOn(repository, 'insert');

    let output = await useCase.execute({name: 'test'});

    publisher = repository.insert.mock.calls[0][0]
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: publisher.id,
      name: publisher.name,
      createdAt: publisher.createdAt,
      active: publisher.active
    });
    expect(publisher.createdAt).not.toBeUndefined()
  });
});
