import { ValueObject } from '#shared/domain';
import { InvalidCicloError } from '#class/domain';


enum CicloEnum {
  MATERNAL = 'maternal',
  JARDIM = 'jardim',
  PRIMEIRO = 'primeiro',
  PRIMEIROB = 'primeirob',
  SEGUNDO = 'misplaced',
  TERCEIRO = 'TERCEIRO',
}
export default class Ciclo extends ValueObject<string> {
  static MATERNAL = new Ciclo(CicloEnum.MATERNAL)
  static JARDIM = new Ciclo(CicloEnum.JARDIM)
  static PRIMEIRO = new Ciclo(CicloEnum.PRIMEIRO)
  static PRIMEIROB = new Ciclo(CicloEnum.PRIMEIROB)
  static SEGUNDO = new Ciclo(CicloEnum.SEGUNDO)

  static from (value: string) {
    Ciclo.validate(value)
    return new Ciclo(value)
  }

  equals(aCiclo: Ciclo) : boolean {
    return this.value === aCiclo.value;
  }


  static validate(value) {
    const invalidStatus = !Object.values(CicloEnum).includes(value)
      if (invalidStatus) throw new InvalidCicloError();
  }
}
