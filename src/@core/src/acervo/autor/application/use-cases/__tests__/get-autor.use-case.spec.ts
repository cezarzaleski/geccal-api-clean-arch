import { GetAutorUseCase } from '../get-autor.use-case';
import NotFoundError from '../../../../../@shared/domain/errors/not-found.error';
import { Autor } from '../../../domain/entities/autor';
import { mock, MockProxy } from 'jest-mock-extended';
import { AutorRepository } from '#acervo/autor/domain';

describe('GetAutorUseCase Unit Tests', () => {
  let useCase: GetAutorUseCase.UseCase;
  let repository: MockProxy<AutorRepository.Repository>

  beforeEach(() => {
    repository = mock()
    useCase = new GetAutorUseCase.UseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    repository.findById.mockRejectedValue(new NotFoundError(`Entity Not Found using ID fake id`))
    await expect(() =>
      useCase.execute({id: 'fake id'})
    ).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));
  });

  it('should returns a autor', async () => {
    const item = new Autor({nome: 'Maria'});
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
