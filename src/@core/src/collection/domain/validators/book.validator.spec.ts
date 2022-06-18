import { BookProperties, BookValidator, BookValidatorFactory } from '#collection/domain';
import BookPropertiesFake from '#collection/domain/entities/__tests__/bookPropertiesFake';

describe('BookValidator Tests', () => {
  let validator: BookValidator;
  let props: BookProperties

  beforeEach(() => {
    validator = BookValidatorFactory.create()
    props = BookPropertiesFake.build()

  });

  test('casos inválidos para nome', () => {
    props = BookPropertiesFake.build({nome: null})
    validator.validate(props)
    expect(validator.errors).toStrictEqual({
      nome: [
        "nome should not be equal to null",
        "nome should not be empty",
        "nome must be a string",
      ]
    })
  })

  test('casos inválidos para exemplar', () => {
    props = BookPropertiesFake
      .build({exemplar: null})
    validator.validate(props)
    expect(validator.errors).toStrictEqual({
      exemplar: [
        "exemplar should not be equal to null"
      ]
    })
  })

  test('casos inválidos para editoraId', () => {
    props = BookPropertiesFake
      .build({editoraId: null})
    validator.validate(props)
    expect(validator.errors).toStrictEqual({
      editoraId: [
        "editoraId should not be equal to null",
        "editoraId should not be empty",
        "editoraId must be a string",
      ]
    })
  })

  test('casos inválidos para editoraId', () => {
    props = BookPropertiesFake
      .build({editoraId: null})
    validator.validate(props)
    expect(validator.errors).toStrictEqual({
      editoraId: [
        "editoraId should not be equal to null",
        "editoraId should not be empty",
        "editoraId must be a string",
      ]
    })
  })

  test('casos inválidos para autores', () => {
    props = BookPropertiesFake
      .build({autores: null})
    validator.validate(props)
    expect(validator.errors).toStrictEqual({
      autores: [
        "autores should not be equal to null",
        "autores should not be empty",
        "autores should not be list",
      ]
    })
  })

  test('casos inválidos para edicao', () => {
    props = BookPropertiesFake
      .build({edicao: null})
    validator.validate(props)
    expect(validator.errors).toStrictEqual({
      edicao: [
        "edicao should not be equal to null",
        "edicao should not be empty",
        "edicao must be a string",
      ]
    })
  })
});
