import StatusBook from './status-book.vo';
import { Author, PublisherId, Origin } from './value-objects';
import { BookValidatorFactory } from '#collection/domain';
import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';


export type BookProperties = {
  name: string,
  exemplary: number,
  status: string,
  edition: string,
  year: number,
  publisherId: string,
  authors: Array<string>,
  origin: string,
  createdAt?: Date,
  updatedAt?: Date,
}

type BookPropertiesUpdate = Omit<BookProperties, 'createdAt' | 'status'>

export class Book extends Entity {
  constructor(
    public name: string,
    public exemplary: number,
    public status: StatusBook,
    public edition: string,
    public year: number,
    public publisherId: PublisherId,
    public authors: Array<Author>,
    public origin: Origin,
    public readonly createdAt: Date,
    id: UniqueEntityId
  ) {
    super(id);
  }

  static from(props: BookProperties, id?: UniqueEntityId): Book {
    props.createdAt = props.createdAt ?? new Date();
    props.updatedAt = props.updatedAt ?? new Date();
    Book.validate(props);
    const publisherId = new PublisherId(props.publisherId)
    const authorsVo = props.authors.map(autor => new Author(autor))
    const origin = new Origin(props.origin)
    const status = StatusBook.from(props.status)
    const {name, exemplary, edition, year, createdAt} = props
    return new Book(name, exemplary, status, edition, year, publisherId, authorsVo, origin, createdAt, id)
  }

  static validate(props: BookProperties) {
    const validator = BookValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  static with(props: {
    name: string,
    exemplary: number,
    status: StatusBook,
    edition: string,
    year: number,
    publisherId: PublisherId,
    authors: Array<Author>,
    origin: Origin,
    createdAt: Date,
    id: UniqueEntityId
  }): Book {
    const {name, exemplary, edition, year, createdAt, status, publisherId, authors, origin, id} = props
    return new Book(name, exemplary, status, edition, year, publisherId, authors, origin, createdAt, id)
  }


  update(
    props: BookPropertiesUpdate
  ) {

    Book.validate({...props, status: this.status.value});
    const {name, exemplary, edition, year, publisherId, authors, origin} = props
    const publisherIdVo = new PublisherId(publisherId)
    const authorsVo = authors.map(autor => new Author(autor))
    const originVo = new Origin(origin)
    this.name = name
    this.exemplary = exemplary
    this.edition = edition
    this.year = year
    this.publisherId = publisherIdVo
    this.authors = authorsVo
    this.origin = originVo
  }

  lost() {
    this.status = StatusBook.LOSS;
  }

  inapropriar() {
    this.status = StatusBook.INAPPROPRIATE;
  }

  donate() {
    this.status = StatusBook.DONATED;
  }

  misplace() {
    this.status = StatusBook.MISPLACED;
  }
}
