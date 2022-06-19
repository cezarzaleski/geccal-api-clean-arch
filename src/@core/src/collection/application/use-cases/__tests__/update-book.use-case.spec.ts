import { mock, MockProxy } from 'jest-mock-extended';
import { NotFoundError } from '#shared/domain';
import { UpdateBookUseCase } from '#collection/application';
import BookRepository from '#collection/domain/repository/book.repository';
import { Book } from '#collection/domain/entities';
import { EditoraId } from '#collection/domain/entities/value-objects';

describe('UpdateBookUseCase Unit Tests', () => {
  let subject: UpdateBookUseCase.UseCase;
  let repository: MockProxy<BookRepository.Repository>
  let livro: Book
  let props: any

  beforeEach(() => {
    repository = mock()
    subject = new UpdateBookUseCase.UseCase(repository);
    const publisherId = new EditoraId()
    props = {
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
  });
  it('should throws error when entity not found', async () => {
    repository.findById.mockRejectedValue(new NotFoundError(`Entity Not Found using ID fake id`))
    await expect(() =>
      subject.execute(props)
    ).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));
  });

  it('should update a book', async () => {
    const entity = Book.from(props);
    repository.update.mockResolvedValue()
    repository.findById.mockResolvedValue(entity)
    const spyUpdate = jest.spyOn(repository, 'update');
    const publisherId = new EditoraId()
    props = {
      authors: ['update'],
      edition: '2ª',
      exemplary: 2,
      origin: 'update',
      publisherId: publisherId.value,
      name: 'update',
      note: 'update'
    }

    let output = await subject.execute({...props, id: entity.id, name: 'update'});

    livro = repository.update.mock.calls[0][0]
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: livro.id,
      name: 'update',
      exemplary: 2,
      status: livro.status.value,
      edition: '2ª',
      note: 'update',
      publisherId: publisherId.value,
      authors: ['update'],
      origin: 'update',
      createdAt: livro.createdAt
    });
  })
});
