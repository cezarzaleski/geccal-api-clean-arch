import { ClassProperties } from '#class/domain';
import Ciclo from '#class/domain/entities/ciclo.vo';

const classPropertiesFake: ClassProperties = {

  startAt: new Date(),
  finishAt: new Date(),
  year: 2020,
  ciclo: Ciclo.MATERNAL.value,
  createdAt: new Date(),
}

export const getClassPropertiesFake = (
  evangelizandoProperties?: Partial<ClassProperties>,
) => ({
  ...classPropertiesFake,
  ...evangelizandoProperties,
});
