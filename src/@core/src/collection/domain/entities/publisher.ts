import { EntityValidationError, isEmpty, UniqueEntityId } from '#shared/domain';
import Entity from '#shared/domain/entity/entity';
import { PublisherValidatorFactory } from '../validators';

export type PublisherProperties = {
  name: string,
  active?: boolean,
  createdAt?: Date,
  updatedAt?: Date,
  deletedAt?: Date;
}

export class Publisher extends Entity {

  private constructor(
    public name: string,
    public active: boolean,
    public readonly createdAt: Date,
    id?: UniqueEntityId,
    public readonly updatedAt?: Date,
    public readonly deletedAt?: Date,
    ) {
    super(id);
  }

  static from(props: PublisherProperties, id?: UniqueEntityId): Publisher {
    props.createdAt = isEmpty(props.createdAt) ? new Date() : props.createdAt;
    props.updatedAt = isEmpty(props.updatedAt) ? new Date() : props.updatedAt;
    props.active = props.active ?? true;
    Publisher.validate(props);
    const {name, createdAt, updatedAt, deletedAt, active} = props
    return new Publisher(name, active, createdAt, id, updatedAt, deletedAt)
  }

  static validate(props: PublisherProperties) {
    const validator = PublisherValidatorFactory.create();
    const isValid = validator.validate(props);
    console.log(isValid)
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  update(nome: string) {
    Publisher.validate({name: nome, active: true});
    this.name = nome;
  }

  static with(id, name, active, createdAt, updatedAt, deletedAt) {
    return new Publisher(name, active, createdAt, id, updatedAt, deletedAt)
  }
}
