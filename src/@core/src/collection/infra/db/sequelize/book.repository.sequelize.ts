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
      name: entity.nome,
      exemplary: entity.exemplar,
      status: entity.situacao.value,
      edition: entity.edicao,
      note: entity.observacao,
      publisherId: entity.editoraId.value,
      authors: entity.autores.map(autor => autor.value),
      origin: entity.origem.value,
      createdAt: entity.criadoEm,
      updatedAt: entity.criadoEm
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