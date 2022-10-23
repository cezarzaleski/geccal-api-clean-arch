import { mock, MockProxy } from 'jest-mock-extended';
import { Publisher, PublisherRepository } from '#collection/domain';
import { ListPublishersUseCase, PublisherOutputMapper } from '#collection/application';

describe('ListPublishersUseCase Unit Tests', () => {
  let useCase: ListPublishersUseCase.UseCase;
  let repository: MockProxy<PublisherRepository.Repository>

  beforeEach(() => {
    repository = mock()
    useCase = new ListPublishersUseCase.UseCase(repository);
  });

  test('toOutput method', () => {
    let result = new PublisherRepository.SearchResult({
      items: [],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });
    let output = useCase['toOutput'](result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      currentPage: 1,
      perPage: 2,
      lastPage: 1,
    });

    const entity = Publisher.from({name: 'Maria', active: true});
    result = new PublisherRepository.SearchResult({
      items: [entity],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });

    output = useCase['toOutput'](result);
    expect(output).toStrictEqual({
      items: [PublisherOutputMapper.toOutput(entity)],
      total: 1,
      currentPage: 1,
      perPage: 2,
      lastPage: 1,
    });
  });

  it('should returns output using empty input with publishers ordered by created_at', async () => {
    const items: Array<Publisher> = [
      Publisher.from({name: 'test 1', active: true}),
      Publisher.from({
        name: 'test 2',
        active: true,
        createdAt: new Date(new Date().getTime() + 100),
      }),
    ];
    // @ts-ignore
    repository.search.mockResolvedValue({
      items: items,
      total: 2,
      currentPage: 1,
      perPage: 15,
      lastPage: 1,
    })

    const output = await useCase.execute({});
    expect(output).toStrictEqual({
      items: items.map(item => PublisherOutputMapper.toOutput(item)),
      total: 2,
      currentPage: 1,
      perPage: 15,
      lastPage: 1,
    });
  });
});
