import { ListAutoresUseCase } from '../list-autores.use-case';
import { Autor, AutorRepository } from '../../../domain';
import { mock, MockProxy } from 'jest-mock-extended';

describe('ListAutoresUseCase Unit Tests', () => {
  let useCase: ListAutoresUseCase.UseCase;
  let repository: MockProxy<AutorRepository.Repository>

  beforeEach(() => {
    repository = mock()
    useCase = new ListAutoresUseCase.UseCase(repository);
  });

  test('toOutput method', () => {
    let result = new AutorRepository.SearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });
    let output = useCase['toOutput'](result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });

    const entity = new Autor({nome: 'Maria'});
    result = new AutorRepository.SearchResult({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });

    output = useCase['toOutput'](result);
    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
  });

  it('should returns output using empty input with categories ordered by created_at', async () => {
    const items: Array<Autor> = [
      new Autor({nome: 'test 1'}),
      new Autor({
        nome: 'test 2',
        criadoEm: new Date(new Date().getTime() + 100),
      }),
    ];
    // @ts-ignore
    repository.search.mockResolvedValue({
      items: items,
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    })

    const output = await useCase.execute({});
    expect(output).toStrictEqual({
      items: [...items].map((i) => i.toJSON()),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });
});
