import { mock, MockProxy } from 'jest-mock-extended';
import { CreateAutorUseCase } from "#acervo/application/use-cases/create-autor.use-case";
import AutorRepository from '#acervo/domain/repository/autor.repository';


describe("CreateCategoryUseCase Unit Tests", () => {
  let useCase: CreateAutorUseCase.UseCase;
  let repository: MockProxy<AutorRepository.Repository>
  let autor: any

  beforeEach(() => {
    repository = mock()
    useCase = new CreateAutorUseCase.UseCase(repository);
  });

  it("should create a autor ativo", async () => {
    repository.insert.mockResolvedValue()
    const spyInsert = jest.spyOn(repository, 'insert');

    let output = await useCase.execute({nome: "test"});

    autor = repository.insert.mock.calls[0][0]
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: autor.id,
      nome: autor.nome,
      ativo: autor.ativo,
      criadoEm: autor.criadoEm,
    });
  });
  it("should create a autor false", async () => {
    repository.insert.mockResolvedValue()
    const spyInsert = jest.spyOn(repository, 'insert');

    let output = await useCase.execute({
      nome: "test",
      ativo: false,
    });

    expect(spyInsert).toHaveBeenCalledTimes(1);
    autor = repository.insert.mock.calls[0][0]
    expect(output).toStrictEqual({
      id: autor.id,
      nome: autor.nome,
      ativo: autor.ativo,
      criadoEm: autor.criadoEm,
    });
  });
});
