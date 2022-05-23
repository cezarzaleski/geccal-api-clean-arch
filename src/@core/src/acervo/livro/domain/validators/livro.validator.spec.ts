import { LivroValidator, LivroValidatorFactory, } from './livro.validator';

describe.skip('LivroValidator Tests', () => {
  let validator: LivroValidator;

  beforeEach(() => (validator = LivroValidatorFactory.create()));

  test('casos inválidos para o nome', () => {
    expect({ validator, data: null }).containsErrorMessages({
      nome: [
        'nome should not be empty',
        'nome must be a string'
      ],
    });

    expect({ validator, data: { nome: null } }).containsErrorMessages({
      nome: [
        'nome should not be empty',
        'nome must be a string'
      ],
    });

    expect({ validator, data: { nome: '' } }).containsErrorMessages({
      nome: ['nome should not be empty'],
    });

    expect({ validator, data: { nome: 5 as any } }).containsErrorMessages({
      nome: [
        'nome must be a string'
      ],
    });
  });

  test('casos inválidos para o campo ativo', () => {
    expect({ validator, data: { ativo: 5 } }).containsErrorMessages({
      ativo: ['ativo must be a boolean value'],
    });

    expect({ validator, data: { ativo: 0 } }).containsErrorMessages({
      ativo: ['ativo must be a boolean value'],
    });

    expect({ validator, data: { ativo: 1 } }).containsErrorMessages({
      ativo: ['ativo must be a boolean value'],
    });
  });
});
