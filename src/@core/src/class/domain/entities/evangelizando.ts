import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import { EvangelizandoValidatorFactory } from '#class/domain/validators/evangelizando.validator';

export type EvangelizandoProperties = {
  name: string;
  sex: string;
  fatherName?: string;
  motherName?: string;
  birthday?: Date;
  createdAt?: Date;
}

export default class Evangelizando extends Entity {
  private constructor(
    public name: string,
    public sex: string,
    id: UniqueEntityId,
    public readonly createdAt: Date,
    public readonly updateAt: Date,
    public fatherName?: string,
    public motherName?: string,
    public birthday?: Date,
    public deletedAt?: Date,
  ) {
    super(id);
  }

  static from(props: EvangelizandoProperties) {
    props.createdAt = props.createdAt ?? new Date();
    Evangelizando.validate(props)
    const {name, fatherName, motherName, birthday, sex, createdAt} = props;
    return new Evangelizando(name, sex, new UniqueEntityId(), createdAt, createdAt, fatherName, motherName, birthday);
  }

  static validate(props: EvangelizandoProperties) {
    const validator = EvangelizandoValidatorFactory.create()
    const isInvalid = !validator.validate(props)
    if (isInvalid) throw new EntityValidationError(validator.errors)
  }

  delete(deletedAt: Date) {
    this.deletedAt = deletedAt
  }
}
