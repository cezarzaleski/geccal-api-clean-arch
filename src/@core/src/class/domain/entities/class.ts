import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import Ciclo from '#class/domain/entities/ciclo.vo';
import { ClassValidatorFactory } from '#class/domain/validators/class.validator';
import Enrollment from '#class/domain/entities/enrollment';

export type ClassProperties = {
  startAt: Date;
  finishAt: Date;
  year: number;
  ciclo: string;
  createdAt?: Date;
  updateAt?: Date,
  deletedAt?: Date,
}

export default class Class extends Entity {
  private constructor(
    public startAt: Date,
    public finishAt: Date,
    public year: number,
    public ciclo: Ciclo,
    id: UniqueEntityId,
    public readonly enrollments: Enrollment[],
    public readonly createdAt: Date,
    public readonly updateAt: Date,
    public deletedAt?: Date,
  ) {
    super(id);
  }

  static from(props: ClassProperties) {
    props.createdAt = props.createdAt ?? new Date();
    Class.validate(props)
    const {startAt, finishAt, year, ciclo, createdAt, deletedAt} = props;
    const aCiclo = Ciclo.create(ciclo);
    return new Class(
      startAt,
      finishAt,
      year,
      aCiclo,
      new UniqueEntityId(),
      [],
      createdAt,
      new Date(),
      deletedAt
    );
  }

  static validate(props: ClassProperties) {
    const validator = ClassValidatorFactory.create()
    const isInvalid = !validator.validate(props)
    if (isInvalid) throw new EntityValidationError(validator.errors)
  }

  delete(deletedAt: Date) {
    this.deletedAt = deletedAt
  }

  addEnrollment(evangelizandoId: UniqueEntityId, createAt: Date = new Date()) {
    this.enrollments.push(Enrollment.from({evangelizandoId, createAt}))
  }

  static with(props: {
    createdAt: Date;
    deletedAt: Date;
    ciclo: Ciclo;
    year: number;
    updateAt: Date;
    id: UniqueEntityId;
    startAt: Date;
    finishAt: Date,
    enrollments: Enrollment[]
  }) {
    const {ciclo, year, updateAt, createdAt, startAt, finishAt, id, deletedAt, enrollments} = props
    return new Class(startAt, finishAt, year, ciclo, id, enrollments, createdAt, updateAt, deletedAt)
  }
}
