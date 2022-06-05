import { LivroValidator, LivroValidatorFactory, } from './livro.validator';
import { LivroProperties } from '#acervo/livro/domain';
import LivroPropertiesFake from '#acervo/livro/domain/entities/__tests__/livro.properties.fake';

describe('LivroValidator Tests', () => {
  let validator: LivroValidator;
  let props: LivroProperties

  beforeEach(() => {
    validator = LivroValidatorFactory.create()
    props = LivroPropertiesFake.build()

  });

  test('casos inválidos para nome', () => {
    props = LivroPropertiesFake.build({nome: null})
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
    props = LivroPropertiesFake
      .build({exemplar: null})
    validator.validate(props)
    expect(validator.errors).toStrictEqual({
      exemplar: [
        "exemplar should not be equal to null"
      ]
    })
  })

  test('casos inválidos para editoraId', () => {
    props = LivroPropertiesFake
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
    props = LivroPropertiesFake
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
    props = LivroPropertiesFake
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
    props = LivroPropertiesFake
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
