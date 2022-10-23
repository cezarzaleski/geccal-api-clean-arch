import { ValueObject } from '#shared/domain';
import InvalidGenderError from '#class/domain/erros/invalid-gender.error';

enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}
export default class Gender extends ValueObject<string> {
  static MALE = new Gender(GenderEnum.MALE)
  static FEMALE = new Gender(GenderEnum.FEMALE)

  static create (value: string) {
    Gender.validate(value)
    return new Gender(value)
  }

  static from (value: string) {
    return new Gender(value)
  }

  equals(aGender: Gender) : boolean {
    return this.value === aGender.value;
  }

  static validate(value) {
    const invalidGender = !Object.values(GenderEnum).includes(value)
      if (invalidGender) throw new InvalidGenderError();
  }
}
