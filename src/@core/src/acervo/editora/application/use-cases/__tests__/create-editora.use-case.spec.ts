import { mock, MockProxy } from 'jest-mock-extended';
import { CreateEditoraUseCase } from '#acervo/editora/application';
import { EditoraRepository } from '#acervo/editora/domain/repository';

describe('CreateEditoraUseCase Unit Tests', () => {
  let useCase: CreateEditoraUseCase.UseCase;
  let repository: MockProxy<EditoraRepository.Repository>
  let editora: any

  beforeEach(() => {
    repository = mock()
    useCase = new CreateEditoraUseCase.UseCase(repository);
  });


  it('should create a editora ativo', async () => {
    repository.insert.mockResolvedValue()
    const spyInsert = jest.spyOn(repository, 'insert');

    let output = await useCase.execute({nome: 'test'});

    editora = repository.insert.mock.calls[0][0]
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: editora.id,
      nome: editora.nome,
      ativo: editora.ativo,
      criadoEm: editora.criadoEm,
    });
  });
  it('should create a editora false', async () => {
    repository.insert.mockResolvedValue()
    const spyInsert = jest.spyOn(repository, 'insert');

    let output = await useCase.execute({
      nome: 'test',
      ativo: false,
    });

    expect(spyInsert).toHaveBeenCalledTimes(1);
    editora = repository.insert.mock.calls[0][0]
    expect(output).toStrictEqual({
      id: editora.id,
      nome: editora.nome,
      ativo: editora.ativo,
      criadoEm: editora.criadoEm,
    });
  });
});
