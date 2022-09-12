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
    const {name, createdAt, updatedAt, active} = props
    return new Publisher(name, active, createdAt, id, updatedAt)
  }

  static validate(props: PublisherProperties) {
    const validator = PublisherValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  update(name: string, active: boolean) {
    Publisher.validate({name: name, active: active});
    this.name = name;
  }

  static with(id, name, active, createdAt, updatedAt, deletedAt) {
    return new Publisher(name, active, createdAt, id, updatedAt, deletedAt)
  }
}
