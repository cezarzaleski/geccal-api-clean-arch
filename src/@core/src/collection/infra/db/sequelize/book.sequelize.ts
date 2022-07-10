import { Column, DataType, Model, PrimaryKey, Table, ForeignKey } from "sequelize-typescript"
import { Author, Book, BookRepository, Origin, PublisherId } from '#collection/domain';
import { UniqueEntityId } from '#shared/domain';
import StatusBook from '#collection/domain/entities/status-book.vo';
import { PublisherSequelize } from '#collection/infra';

export namespace BookSequelize {

  type BookModelProperties = {
    id: string;
    name: string;
    exemplary: number | null;
    status: string;
    edition: string | null;
    note: string | null;
    publisherId: string;
    authors: Array<string>;
    origin: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }

  @Table({tableName: 'books', timestamps: false})
  export class BookModel extends Model<BookModelProperties> {
    @PrimaryKey
    @Column({allowNull: true, type: DataType.UUID})
    declare id: string;

    @Column({allowNull: false, type: DataType.STRING(255)})
    declare name: string;

    @Column({type: DataType.STRING(255)})
    declare exemplary: number | null;

    @Column({allowNull: false, type: DataType.STRING})
    declare status: string;

    @Column({type: DataType.STRING})
    declare edition: string | null;

    @Column({type: DataType.STRING})
    declare note: string | null;

    @ForeignKey(() => PublisherSequelize.PublisherModel)
    @Column({allowNull: false, type: DataType.UUID, field: 'publisher_id'})
    declare publisherId: string;

    @Column({allowNull: false, type: DataType.JSON})
    declare authors: Array<string>;

    @Column({allowNull: false, type: DataType.STRING})
    declare origin: string;

    @Column({allowNull: false, type: DataType.DATE, field: 'created_at'})
    declare createdAt: Date;

    @Column({type: DataType.DATE, field: 'updated_at'})
    declare updatedAt: Date | null;

    @Column({type: DataType.DATE, field: 'deleted_at'})
    declare deletedAt: Date | null;
  }

  export class Repository implements BookRepository.Repository {
    sortableFields: string[] = ['name', 'createdAt'];

    constructor(private bookModel: typeof BookSequelize.BookModel) {
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
      await this.bookModel.create(BookModelMapper.toModel(entity));
    }

    update(entity: Book): Promise<void> {
      return Promise.resolve(undefined);
    }

    search(props: BookRepository.SearchParams): Promise<BookRepository.SearchResult> {
      return Promise.resolve(undefined);
    }
  }

  export class BookModelMapper {
    static toEntity(model: BookModel): Book {
      return Book.with({
        id: new UniqueEntityId(model.id),
        name: model.name,
        exemplary: model.exemplary,
        status: StatusBook.with(model.status),
        edition: model.edition,
        note: model.note,
        publisherId: new PublisherId(model.publisherId),
        authors: model.authors.map(author => new Author(author)),
        origin: new Origin(model.origin),
        createdAt: model.createdAt,
      });
    }
    static toModel(entity: Book): any {
      return {
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
        updatedAt: entity.createdAt,
        deletedAt: undefined
      }
    }
  }
}
