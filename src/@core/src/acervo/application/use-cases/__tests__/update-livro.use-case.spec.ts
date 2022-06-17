import { mock, MockProxy } from 'jest-mock-extended';
import { NotFoundError } from '#shared/domain';
import { UpdateLivroUseCase } from '#acervo/application';
import LivroRepository from '#acervo/domain/repository/livro.repository';
import { Livro } from '#acervo/domain/entities';
import { EditoraId } from '#acervo/domain/entities/value-objects';

describe('UpdateLivroUseCase Unit Tests', () => {
  let subject: UpdateLivroUseCase.UseCase;
  let repository: MockProxy<LivroRepository.Repository>
  let livro: Livro
  let props: any

  beforeEach(() => {
    repository = mock()
    subject = new UpdateLivroUseCase.UseCase(repository);
    const editoraId = new EditoraId()
    props = {
      autores: ['luiz', 'maria'],
      criadoEm: new Date(),
      edicao: '1ª',
      exemplar: 1,
      origem: 'doacao',
      editoraId: editoraId.value,
      nome: 'livro',
      situacao: 'disponivel',
      observacao: 'observacao'
    }
  });
  it('should throws error when entity not found', async () => {
    repository.findById.mockRejectedValue(new NotFoundError(`Entity Not Found using ID fake id`))
    await expect(() =>
      subject.execute(props)
    ).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));
  });

  it('should update a livro', async () => {
    const entity = Livro.from(props);
    repository.update.mockResolvedValue()
    repository.findById.mockResolvedValue(entity)
    const spyUpdate = jest.spyOn(repository, 'update');
    const editoraId = new EditoraId()
    props = {
      autores: ['update'],
      edicao: '2ª',
      exemplar: 2,
      origem: 'update',
      editoraId: editoraId.value,
      nome: 'update',
      observacao: 'update'
    }

    let output = await subject.execute({...props, id: entity.id, nome: 'update'});

    livro = repository.update.mock.calls[0][0]
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: livro.id,
      nome: 'update',
      exemplar: 2,
      situacao: livro.situacao.value,
      edicao: '2ª',
      observacao: 'update',
      editoraId: editoraId.value,
      autores: ['update'],
      origem: 'update',
      criadoEm: livro.criadoEm
    });
  })
});
