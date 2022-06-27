import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import Ciclo from '#class/domain/entities/ciclo.vo';
import { ClassValidatorFactory } from '#class/domain/validators/class.validator';

export type ClassProperties = {
  startAt: Date;
  finishAt: Date;
  year: number;
  ciclo: string;
  createdAt?: Date;
}

export default class Class extends Entity {
  private constructor(
    public startAt: Date,
    public finishAt: Date,
    public year: number,
    public ciclo: Ciclo,
    id: UniqueEntityId,
    public readonly createdAt: Date,
    public readonly updateAt: Date,
    public deletedAt?: Date,
  ) {
    super(id);
  }

  static from(props: ClassProperties) {
    props.createdAt = props.createdAt ?? new Date();
    Class.validate(props)
    const {startAt, finishAt, year, ciclo, createdAt} = props;
    const aCiclo = Ciclo.from(ciclo);
    return new Class(startAt, finishAt, year, aCiclo, new UniqueEntityId(), createdAt, new Date());
  }

  static validate(props: ClassProperties) {
   const validator = ClassValidatorFactory.create()
   const isInvalid = !validator.validate(props)
   if (isInvalid) throw new EntityValidationError(validator.errors)
  }

  delete(deletedAt: Date) {
    this.deletedAt = deletedAt
  }
}
