import { BookProperties, BookValidator, BookValidatorFactory } from '#collection/domain';
import BookPropertiesFake from '#collection/domain/entities/__tests__/bookPropertiesFake';

describe('BookValidator Tests', () => {
  let validator: BookValidator;
  let props: BookProperties

  beforeEach(() => {
    validator = BookValidatorFactory.create()
    props = BookPropertiesFake.build()

  });

  test('casos inválidos para name', () => {
    props = BookPropertiesFake.build({name: null})
    validator.validate(props)
    expect(validator.errors).toStrictEqual({
      name: [
        "name should not be equal to null",
        "name should not be empty",
        "name must be a string",
      ]
    })
  })

  test('casos inválidos para exemplary', () => {
    props = BookPropertiesFake
      .build({exemplary: null})
    validator.validate(props)
    expect(validator.errors).toStrictEqual({
      exemplary: [
        "exemplary should not be equal to null"
      ]
    })
  })

  test('casos inválidos para publisherId', () => {
    props = BookPropertiesFake
      .build({publisherId: null})
    validator.validate(props)
    expect(validator.errors).toStrictEqual({
      publisherId: [
        "publisherId should not be equal to null",
        "publisherId should not be empty",
        "publisherId must be a string",
      ]
    })
  })

  test('casos inválidos para publisherId', () => {
    props = BookPropertiesFake
      .build({publisherId: null})
    validator.validate(props)
    expect(validator.errors).toStrictEqual({
      publisherId: [
        "publisherId should not be equal to null",
        "publisherId should not be empty",
        "publisherId must be a string",
      ]
    })
  })

  test('casos inválidos para authors', () => {
    props = BookPropertiesFake
      .build({authors: null})
    validator.validate(props)
    expect(validator.errors).toStrictEqual({
      authors: [
        "authors should not be equal to null",
        "authors should not be empty",
        "authors should not be list",
      ]
    })
  })

  test('casos inválidos para edition', () => {
    props = BookPropertiesFake
      .build({edition: null})
    validator.validate(props)
    expect(validator.errors).toStrictEqual({
      edition: [
        "edition should not be equal to null",
        "edition should not be empty",
        "edition must be a string",
      ]
    })
  })
});
