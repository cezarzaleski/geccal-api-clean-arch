import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import { EvangelizandoValidatorFactory } from '#class/domain/validators/evangelizando.validator';
import Gender from '#class/domain/entities/gender.vo';

export type EvangelizandoProperties = {
  name: string;
  gender: string;
  fatherName?: string;
  motherName?: string;
  birthday?: Date;
  createdAt?: Date;
}

export default class Evangelizando extends Entity {
  private constructor(
    public name: string,
    public gender: Gender,
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
    const {name, fatherName, motherName, birthday, gender, createdAt} = props;
    const aGender = Gender.create(gender);
    return new Evangelizando(name, aGender, new UniqueEntityId(), createdAt, createdAt, fatherName, motherName, birthday);
  }

  static with(props: {
    name: string,
    gender: Gender,
    fatherName?: string,
    motherName?: string,
    birthday?: Date,
    createdAt: Date,
    updateAt: Date,
    deletedAt: Date,
    id: UniqueEntityId
  }): Evangelizando {
    const {name, gender, updateAt, createdAt, fatherName, motherName, id, birthday, deletedAt} = props
    return new Evangelizando(name, gender, id, createdAt, updateAt, fatherName, motherName, birthday, deletedAt)
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
