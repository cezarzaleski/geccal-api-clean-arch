import Entity from '../../../@shared/domain/entity/entity';
import UniqueEntityId from '../../../@shared/domain/value-objects/unique-entity-id.vo';

export type BookProperties = {
  name: string,
  exemplary: number,
  isActive?: boolean,
  edition: string,
  description?: string,
  publishingCompany: string,
  author: string,
  origin: string,
  createdAt?: Date,
}

export class Book extends Entity<BookProperties>{
  constructor(props: BookProperties, id?: UniqueEntityId) {
    super(props, id);
  }

  activate() {
    this.props.isActive = true;
  }

  deactivate() {
    this.props.isActive = false;
  }

  get name() {
    return this.props.name
  }
  private set name(value) {
    this.props.name = value
  }

  get exemplary() {
    return this.props.exemplary
  }

  private set exemplary(value) {
    this.props.exemplary = value
  }

  get isActive() {
    return this.props.isActive
  }

  private set isActive(value: boolean) {
    this.props.isActive = value ?? true;
  }

  get edition() {
    return this.props.edition
  }

  private set edition(value) {
    this.props.edition = value
  }

  get description() {
    return this.props.description
  }

  private set description(value) {
    this.props.description = value
  }

  get publishingCompany() {
    return this.props.publishingCompany
  }

  private set publishingCompany(value) {
    this.props.publishingCompany = value
  }

  get author() {
    return this.props.author
  }

  private set author(value) {
    this.props.author = value
  }

  get origin() {
    return this.props.origin
  }

  private set origin(value) {
    this.props.origin = value
  }

  get createdAt() {
    return this.props.createdAt
  }

  private set createdAt(value) {
    this.props.createdAt = value
  }
}
