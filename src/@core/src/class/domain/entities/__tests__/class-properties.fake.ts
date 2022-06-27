import { ClassProperties } from '#class/domain';
import Ciclo from '#class/domain/entities/ciclo.vo';


export default class ClassPropertiesFake {
  static build(
    {
      startAt = new Date(),
      finishAt = new Date(),
      year = 2020,
      ciclo = Ciclo.MATERNAL.value,
      createdAt = new Date(),
    }: {
      startAt?: Date,
      finishAt?: Date,
      year?: number,
      ciclo?: string,
      createdAt?: Date,
    } = {}): ClassProperties {
    return {
      startAt: startAt,
      finishAt: finishAt,
      year: year,
      ciclo: ciclo,
      createdAt: createdAt,
    }
  }
}
