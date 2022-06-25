import { EntityValidationError, UniqueEntityId } from '#shared/domain';
import Entity from '#shared/domain/entity/entity';
import { PublisherValidatorFactory } from '../validators';

export type PublisherProperties = {
  name: string,
  ativo?: boolean,
  createdAt?: Date,
}

export class Publisher extends Entity {

  private constructor(
    public name: string,
    public ativo: boolean,
    public readonly createdAt: Date,
    id?: UniqueEntityId) {
    super(id);
  }

  static from(props: PublisherProperties, id?: UniqueEntityId): Publisher {
    let {name, ativo, createdAt} = props
    if (ativo === undefined) ativo = true
    props.createdAt = props.createdAt ?? new Date();
    Publisher.validate(props);
    return new Publisher(name, ativo, createdAt, id)
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
}
