import { Entity, UniqueEntityId } from '#shared/domain';
import Ciclo from '#enrollment/domain/entities/ciclo.vo';

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
    public readonly deletedAt?: Date,
  ) {
    super(id);
  }

  static from(props: ClassProperties) {
    props.createdAt = props.createdAt ?? new Date();
    const {startAt, finishAt, year, ciclo, createdAt} = props;
    const aCiclo = Ciclo.from(ciclo);
    return new Class(startAt, finishAt, year, aCiclo, new UniqueEntityId(), createdAt, new Date());
  }
}
