import { mock, MockProxy } from 'jest-mock-extended';
import { CreateBookUseCase } from '#collection/application';
import { Book, BookRepository } from '#collection/domain';
import { EditoraId } from '#collection/domain/entities/value-objects';

describe('CreateLivroUseCase Unit test', function () {

  let subject: CreateBookUseCase.UseCase;
  let repository: MockProxy<BookRepository.Repository>
  let livro: Book

  beforeEach(() => {
    repository = mock()
    subject = new CreateBookUseCase.UseCase(repository);
  });

  it('should create livro', async () => {
    repository.insert.mockResolvedValue()
    const spyInsert = jest.spyOn(repository, 'insert');
    const editoraId = new EditoraId()
    const props = {
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

    const output = await subject.execute(props);

    livro = repository.insert.mock.calls[0][0]
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: livro.id,
      nome: livro.nome,
      exemplar: livro.exemplar,
      situacao: livro.situacao.value,
      edicao: livro.edicao,
      observacao: livro.observacao,
      editoraId: livro.editoraId.id,
      autores: livro.autores.map(autor => autor.value),
      origem: livro.origem.value,
      criadoEm: livro.criadoEm
    });

  });

});
