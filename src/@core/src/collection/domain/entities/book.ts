import { EntityValidationError, UniqueEntityId } from '#shared/domain';
import StatusBook from '#collection/domain/entities/status-book.vo';
import { BookValidatorFactory } from '#collection/domain/validators';
import Entity from '#shared/domain/entity/entity';
import { Author, PublisherId, Origin } from '#collection/domain/entities/value-objects';


export type BookProperties = {
  name: string,
  exemplary: number,
  status: string,
  edition: string,
  note?: string,
  publisherId: string,
  authors: Array<string>,
  origin: string,
  createdAt?: Date,
}

type BookPropertiesUpdate = Omit<BookProperties, 'createdAt' | 'status'>

export class Book extends Entity {
  private constructor(
    public name: string,
    public exemplary: number,
    public status: StatusBook,
    public edition: string,
    public note: string,
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
    Book.validate(props);
    const publisherId = new PublisherId(props.publisherId)
    const authorsVo = props.authors.map(autor => new Author(autor))
    const origin =  new Origin(props.origin)
    const status =  StatusBook.from(props.status)
    const {name, exemplary, edition, note, createdAt} = props
    return new Book(name, exemplary, status, edition, note, publisherId, authorsVo, origin, createdAt, id)
  }

  static validate(props: BookProperties) {
    const validator = BookValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  update(
    props: BookPropertiesUpdate
  ) {

    Book.validate({...props, status: this.status.value});
    const {name, exemplary, edition, note, publisherId, authors, origin} = props
    const publisherIdVo = new PublisherId(publisherId)
    const authorsVo = authors.map(autor => new Author(autor))
    const originVo =  new Origin(origin)
    this.name = name
    this.exemplary = exemplary
    this.edition = edition
    this.note = note
    this.publisherId = publisherIdVo
    this.authors = authorsVo
    this.origin = originVo
  }

  lost() {
    this.status = StatusBook.LOST;
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
