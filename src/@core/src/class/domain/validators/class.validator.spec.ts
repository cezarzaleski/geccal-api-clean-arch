import { ClassValidator, ClassValidatorFactory } from '#class/domain/validators/class.validator';
import { ClassProperties } from '#class/domain';
import { getClassPropertiesFake } from '#class/domain/entities/__tests__/class-properties.fake';


describe('ClassValidator Unit Test', () =>  {
  let validator: ClassValidator
  let props: ClassProperties

  beforeEach(() => {
    validator = ClassValidatorFactory.create()
  })

  test('should be defined', () => {
    props = getClassPropertiesFake()

    validator.validate(props)
    const subject = validator.errors

    expect(subject).toBeNull()
  })

  test('should be empty startAt', () => {
    props = getClassPropertiesFake({startAt: null})

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
    props = getClassPropertiesFake({finishAt: null})

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
