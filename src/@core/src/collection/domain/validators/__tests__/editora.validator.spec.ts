import {
  PublisherRules,
  PublisherValidator,
  PublisherValidatorFactory
} from '../../validators';


describe("PublisherValidator Tests", () => {
  let validator: PublisherValidator;

  beforeEach(() => (validator = PublisherValidatorFactory.create()));

  test.skip("casos inválidos para o name", () => {
    expect({ validator, data: null }).containsErrorMessages({
      name: [
        "name should not be empty",
        "name must be a string"
      ],
    });

    expect({ validator, data: { name: null } }).containsErrorMessages({
      name: [
        "name should not be empty",
        "name must be a string"
      ],
    });

    expect({ validator, data: { name: "" } }).containsErrorMessages({
      name: ["name should not be empty"],
    });

    expect({ validator, data: { name: 5 as any } }).containsErrorMessages({
      name: [
        "name must be a string"
      ],
    });
  });

  test.skip("casos inválidos para o campo ativo", () => {
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
      name: string;
      ativo?: boolean;
    };
    const arrange: Arrange[] = [
      { name: "some value" },
      { name: "some value", ativo: true },
      { name: "some value", ativo: false },
    ];

    arrange.forEach((item) => {
      const isValid = validator.validate(item);
      expect(isValid).toBeTruthy();
      expect(validator.validatedData).toStrictEqual(new PublisherRules(item));
    });
  });
});
