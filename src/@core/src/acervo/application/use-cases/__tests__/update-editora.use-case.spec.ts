import { mock, MockProxy } from 'jest-mock-extended';
import { NotFoundError } from '#shared/domain';
import { UpdateEditoraUseCase } from '#acervo/application';
import { Editora, EditoraRepository } from '#acervo/domain';

describe('UpdateEditoraUseCase Unit Tests', () => {
  let useCase: UpdateEditoraUseCase.UseCase;
  let repository: MockProxy<EditoraRepository.Repository>
  let editora: any

  beforeEach(() => {
    repository = mock()
    useCase = new UpdateEditoraUseCase.UseCase(repository);
  });
  it('should throws error when entity not found', async () => {
    repository.findById.mockRejectedValue(new NotFoundError(`Entity Not Found using ID fake id`))
    await expect(() =>
      useCase.execute({id: 'fake id', nome: 'fake'})
    ).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));
  });

  it('should update a editora', async () => {
    const entity = Editora.from({nome: 'John'});
    repository.update.mockResolvedValue()
    repository.findById.mockResolvedValue(entity)
    const spyUpdate = jest.spyOn(repository, 'update');

    let output = await useCase.execute({id: entity.id, nome: 'update'});

    editora = repository.update.mock.calls[0][0]
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: editora.id,
      nome: 'update',
      ativo: editora.ativo,
      criadoEm: editora.criadoEm,
    });
  })
});
