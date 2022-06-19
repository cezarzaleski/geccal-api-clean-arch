import { mock, MockProxy } from 'jest-mock-extended';
import { CreateBookUseCase } from '#collection/application';
import { Book, BookRepository } from '#collection/domain';
import { EditoraId } from '#collection/domain/entities/value-objects';

describe('CreateBookUseCase Unit test', function () {

  let subject: CreateBookUseCase.UseCase;
  let repository: MockProxy<BookRepository.Repository>
  let livro: Book

  beforeEach(() => {
    repository = mock()
    subject = new CreateBookUseCase.UseCase(repository);
  });

  it('should create a book', async () => {
    repository.insert.mockResolvedValue()
    const spyInsert = jest.spyOn(repository, 'insert');
    const publisherId = new EditoraId()
    const props = {
      authors: ['luiz', 'maria'],
      createdAt: new Date(),
      edition: '1ª',
      exemplary: 1,
      origin: 'doacao',
      publisherId: publisherId.value,
      name: 'livro',
      status: 'disponivel',
      note: 'note'
    }

    const output = await subject.execute(props);

    livro = repository.insert.mock.calls[0][0]
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: livro.id,
      name: livro.name,
      exemplary: livro.exemplary,
      status: livro.status.value,
      edition: livro.edition,
      note: livro.note,
      publisherId: livro.publisherId.id,
      authors: livro.authors.map(autor => autor.value),
      origin: livro.origin.value,
      createdAt: livro.createdAt
    });

  });

});
