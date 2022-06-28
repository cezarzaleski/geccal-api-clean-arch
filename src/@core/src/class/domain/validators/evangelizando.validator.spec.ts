import { EvangelizandoProperties } from '#class/domain';
import {
  EvangelizandoValidator,
  EvangelizandoValidatorFactory
} from '#class/domain/validators/evangelizando.validator';
import EvangelizandoPropertiesFake from '#class/domain/entities/__tests__/evangelizando-properties.fake';


describe('EvangelizandoValidator Unit Test', () =>  {
  let subject: EvangelizandoValidator
  let props: EvangelizandoProperties

  beforeEach(() => {
    subject = EvangelizandoValidatorFactory.create()
  })

  test('should be defined', () => {
    props = EvangelizandoPropertiesFake.build()

    subject.validate(props)
    const result = subject.errors

    expect(result).toBeNull()
  })

  test('should be empty name', () => {
    props = EvangelizandoPropertiesFake.build({name: null})

    subject.validate(props)
    const result = subject.errors

    expect(result).toStrictEqual({
      name: [
        'name should not be empty',
        'name must be a string'
      ]
    })
  })

  test('should be empty sex', () => {
    props = EvangelizandoPropertiesFake.build({sex: null})

    subject.validate(props)
    const result = subject.errors

    expect(result).toStrictEqual({
      sex: [
        'sex should not be empty',
        'sex must be a string'
      ]
    })
  })
});
