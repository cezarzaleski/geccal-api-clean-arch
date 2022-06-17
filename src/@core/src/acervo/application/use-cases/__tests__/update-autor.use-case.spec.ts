import { UpdateAutorUseCase } from '#acervo/application/use-cases/update-autor.use-case';
import { mock, MockProxy } from 'jest-mock-extended';
import { NotFoundError } from '#shared/domain';
import AutorRepository from '#acervo/domain/repository/autor.repository';
import { Autor } from '#acervo/domain/entities/autor';

describe('UpdateCategoryUseCase Unit Tests', () => {
  let useCase: UpdateAutorUseCase.UseCase;
  let repository: MockProxy<AutorRepository.Repository>
  let autor: any

  beforeEach(() => {
    repository = mock()
    useCase = new UpdateAutorUseCase.UseCase(repository);
  });
  it('should throws error when entity not found', async () => {
    repository.findById.mockRejectedValue(new NotFoundError(`Entity Not Found using ID fake id`))
    await expect(() =>
      useCase.execute({id: 'fake id', nome: 'fake'})
    ).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));
  });

  it('should update a category', async () => {
    const entity = new Autor({nome: 'John'});
    repository.update.mockResolvedValue()
    repository.findById.mockResolvedValue(entity)
    const spyUpdate = jest.spyOn(repository, 'update');

    let output = await useCase.execute({id: entity.id, nome: 'update'});

    autor = repository.update.mock.calls[0][0]
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: autor.id,
      nome: 'update',
      ativo: autor.ativo,
      criadoEm: autor.criadoEm,
    });
  })
});
