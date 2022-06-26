import { ClassValidator, ClassValidatorFactory } from '#enrollment/domain/validators/class.validator';
import { ClassProperties } from '#enrollment/domain';
import ClassPropertiesFake from '#enrollment/domain/entities/__tests__/class-properties.fake';

describe('ClassValidator Unit Test', () =>  {
  let validator: ClassValidator
  let props: ClassProperties

  beforeEach(() => {
    validator = ClassValidatorFactory.create()
  })

  test('should be defined', () => {
    props = ClassPropertiesFake.build()

    validator.validate(props)
    const subject = validator.errors

    expect(subject).toBeNull()
  })

  test('should be empty startAt', () => {
    props = ClassPropertiesFake.build({startAt: null})

    validator.validate(props)
    const subject = validator.errors

    expect(subject).toStrictEqual({
      startAt: [
        'startAt should not be equal to null',
        'startAt must be a Date instance'
      ]
    })
  })

  test('should be empty finishAt', () => {
    props = ClassPropertiesFake.build({finishAt: null})

    validator.validate(props)
    const subject = validator.errors

    expect(subject).toStrictEqual({
      finishAt: [
        'finishAt should not be equal to null',
        'finishAt must be a Date instance'
      ]
    })
  })
});
