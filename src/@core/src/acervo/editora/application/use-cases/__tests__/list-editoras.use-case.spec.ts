import { mock, MockProxy } from 'jest-mock-extended';
import { EditoraOutputMapper, ListEditorasUseCase } from '#acervo/editora/application';
import { EditoraRepository } from '#acervo/editora/domain/repository';
import { Editora } from '#acervo/editora/domain';

describe('ListEditorasUseCase Unit Tests', () => {
  let useCase: ListEditorasUseCase.UseCase;
  let repository: MockProxy<EditoraRepository.Repository>

  beforeEach(() => {
    repository = mock()
    useCase = new ListEditorasUseCase.UseCase(repository);
  });

  test('toOutput method', () => {
    let result = new EditoraRepository.SearchResult({
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

    const entity = Editora.from({nome: 'Maria'});
    result = new EditoraRepository.SearchResult({
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
      items: [EditoraOutputMapper.toOutput(entity)],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
  });

  it('should returns output using empty input with editoras ordered by created_at', async () => {
    const items: Array<Editora> = [
      Editora.from({nome: 'test 1'}),
      Editora.from({
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
      items: items.map(item => EditoraOutputMapper.toOutput(item)),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });
});
