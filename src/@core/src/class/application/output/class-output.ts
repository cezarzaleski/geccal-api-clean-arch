import Class from '#class/domain/entities/class';


export type ClassOutput = {
  id: string;
  startAt: Date;
  finishAt: Date;
  year: number;
  ciclo: string;
  createdAt?: Date;
};

export class ClassOutputMapper {
  static toOutput(entity: Class): ClassOutput {
    return {
      id: entity.id,
      startAt: entity.startAt,
      finishAt: entity.finishAt,
      year: entity.year,
      ciclo: entity.ciclo.value,
      createdAt: entity.createdAt
    }
  }
}
