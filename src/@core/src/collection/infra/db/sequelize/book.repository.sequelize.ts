import { UniqueEntityId } from '#shared/domain';
import { Book, BookRepository } from '#collection/domain';
import { BookModel } from '#collection/infra/db/sequelize/book.model';

export class BookRepositorySequelize implements BookRepository.Repository {
  sortableFields: string[] = ['name', 'createdAt'];

  constructor(private bookModel: typeof BookModel) {
  }

  delete(id: string | UniqueEntityId): Promise<void> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<Book[]> {
    return Promise.resolve([]);
  }

  findById(id: string | UniqueEntityId): Promise<Book> {
    return Promise.resolve(undefined);
  }

  async insert(entity: Book): Promise<void> {
    const bookModel: any = {
      id: entity.id,
      name: entity.name,
      exemplary: entity.exemplary,
      status: entity.status.value,
      edition: entity.edition,
      note: entity.note,
      publisherId: entity.publisherId.value,
      authors: entity.authors.map(autor => autor.value),
      origin: entity.origin.value,
      createdAt: entity.createdAt,
      updatedAt: entity.createdAt
    }
    await this.bookModel.create(bookModel)
  }

  update(entity: Book): Promise<void> {
    return Promise.resolve(undefined);
  }

  search(props: BookRepository.SearchParams): Promise<BookRepository.SearchResult> {
    return Promise.resolve(undefined);
  }

}