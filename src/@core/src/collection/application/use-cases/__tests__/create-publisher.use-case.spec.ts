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


  it('should create a publisher ativo', async () => {
    repository.insert.mockResolvedValue()
    const spyInsert = jest.spyOn(repository, 'insert');

    let output = await useCase.execute({name: 'test'});

    publisher = repository.insert.mock.calls[0][0]
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: publisher.id,
      name: publisher.name,
      ativo: publisher.ativo,
      createdAt: publisher.createdAt,
    });
  });
  it('should create a publisher false', async () => {
    repository.insert.mockResolvedValue()
    const spyInsert = jest.spyOn(repository, 'insert');

    let output = await useCase.execute({
      name: 'test',
      ativo: false,
    });

    expect(spyInsert).toHaveBeenCalledTimes(1);
    publisher = repository.insert.mock.calls[0][0]
    expect(output).toStrictEqual({
      id: publisher.id,
      name: publisher.name,
      ativo: publisher.ativo,
      createdAt: publisher.createdAt,
    });
  });
});
