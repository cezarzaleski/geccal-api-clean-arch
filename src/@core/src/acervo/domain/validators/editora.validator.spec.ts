import {
  EditoraRules,
  EditoraValidator,
  EditoraValidatorFactory
} from '#acervo/domain/validators/editora.validator';


describe("EditoraValidator Tests", () => {
  let validator: EditoraValidator;

  beforeEach(() => (validator = EditoraValidatorFactory.create()));

  test("casos inválidos para o nome", () => {
    expect({ validator, data: null }).containsErrorMessages({
      nome: [
        "nome should not be empty",
        "nome must be a string"
      ],
    });

    expect({ validator, data: { nome: null } }).containsErrorMessages({
      nome: [
        "nome should not be empty",
        "nome must be a string"
      ],
    });

    expect({ validator, data: { nome: "" } }).containsErrorMessages({
      nome: ["nome should not be empty"],
    });

    expect({ validator, data: { nome: 5 as any } }).containsErrorMessages({
      nome: [
        "nome must be a string"
      ],
    });
  });

  test("casos inválidos para o campo ativo", () => {
    expect({ validator, data: { ativo: 5 } }).containsErrorMessages({
      ativo: ["ativo must be a boolean value"],
    });

    expect({ validator, data: { ativo: 0 } }).containsErrorMessages({
      ativo: ["ativo must be a boolean value"],
    });

    expect({ validator, data: { ativo: 1 } }).containsErrorMessages({
      ativo: ["ativo must be a boolean value"],
    });
  });

  test("casos válidos de todos os campos", () => {
    type Arrange = {
      nome: string;
      ativo?: boolean;
    };
    const arrange: Arrange[] = [
      { nome: "some value" },
      { nome: "some value", ativo: true },
      { nome: "some value", ativo: false },
    ];

    arrange.forEach((item) => {
      const isValid = validator.validate(item);
      expect(isValid).toBeTruthy();
      expect(validator.validatedData).toStrictEqual(new EditoraRules(item));
    });
  });
});
