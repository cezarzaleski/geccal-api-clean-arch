import { mock, MockProxy } from 'jest-mock-extended';
import { GetEditoraUseCase } from '#acervo/editora/application';
import { EditoraRepository } from '#acervo/editora/domain/repository';
import { NotFoundError } from '#shared/domain';
import { Editora } from '#acervo/editora/domain';

describe('GetEditoraUseCase Unit Tests', () => {
  let useCase: GetEditoraUseCase.UseCase;
  let repository: MockProxy<EditoraRepository.Repository>

  beforeEach(() => {
    repository = mock()
    useCase = new GetEditoraUseCase.UseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    repository.findById.mockRejectedValue(new NotFoundError(`Entity Not Found using ID fake id`))
    await expect(() =>
      useCase.execute({id: 'fake id'})
    ).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));
  });

  it('should returns a editora', async () => {
    const item = Editora.from({nome: 'Maria'});
    repository.findById.mockResolvedValue(item)
    const spyFindById = jest.spyOn(repository, 'findById');
    const output = await useCase.execute({id: item.id});
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: item.id,
      nome: 'Maria',
      ativo: true,
      criadoEm: item.criadoEm,
    });
  });
});
