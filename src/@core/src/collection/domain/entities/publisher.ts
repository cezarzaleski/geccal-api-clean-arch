import { EntityValidationError, UniqueEntityId } from '#shared/domain';
import Entity from '#shared/domain/entity/entity';
import { PublisherValidatorFactory } from '../validators';

export type PublisherProperties = {
  name: string,
  createdAt?: Date,
  updatedAt?: Date,
  deletedAt?: Date;
}

export class Publisher extends Entity {

  private constructor(
    public name: string,
    public readonly createdAt: Date,
    id?: UniqueEntityId,
    public readonly updatedAt?: Date,
    public readonly deletedAt?: Date,
    ) {
    super(id);
  }

  static from(props: PublisherProperties, id?: UniqueEntityId): Publisher {
    props.createdAt = props.createdAt ?? new Date();
    props.updatedAt = props.updatedAt ?? new Date();
    Publisher.validate(props);
    const {name, createdAt, updatedAt, deletedAt} = props
    return new Publisher(name, createdAt, id, updatedAt, deletedAt)
  }

  static validate(props: PublisherProperties) {
    const validator = PublisherValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  update(nome: string) {
    Publisher.validate({name: nome});
    this.name = nome;
  }

  static with(id, name, createdAt, updatedAt, deletedAt) {
    return new Publisher(name, createdAt, id, updatedAt, deletedAt)
  }
}
