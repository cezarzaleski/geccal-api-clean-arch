import BookValidatorFactory, { BookRules, BookValidator } from './book.validator';

describe('BookValidator Unit test', () => {
  let validator: BookValidator

  beforeEach(() => (validator = BookValidatorFactory.create()));

  test('invalidation cases for book', () => {
    expect({validator, data: null}).containsErrorMessages({
      name: [
        'name should not be empty',
        'name must be a string'
      ],
      exemplary: [
        'exemplary should not be empty',
        'exemplary must be a number conforming to the specified constraints'
      ],
      publishingCompany: [
        'publishingCompany should not be empty',
        'publishingCompany must be a string'
      ],
      author: [
        'author should not be empty',
        'author must be a string'
      ],
      origin: [
        'origin should not be empty',
        'origin must be a string'
      ],
      edition: [
        'edition should not be empty',
        'edition must be a string'
      ],
    });
  })
  test("invalidation cases for isActive field", () => {
    expect({ validator, data: { isActive: 5 } }).containsErrorMessages({
      isActive: ["isActive must be a boolean value"],
    });

    expect({ validator, data: { isActive: 0 } }).containsErrorMessages({
      isActive: ["isActive must be a boolean value"],
    });

    expect({ validator, data: { isActive: 1 } }).containsErrorMessages({
      isActive: ["isActive must be a boolean value"],
    });
  });
  test('valid cases for fields', () => {
    type Arrange = {
      name: string,
      exemplary: number,
      isActive?: boolean,
      edition: string,
      description?: string,
      publishingCompany: string,
      author: string,
      origin: string,
      createdAt?: Date,
    };
    const arrange: Arrange[] = [
      {
        name: 'some value',
        exemplary: 1,
        edition: 'some edition',
        publishingCompany: 'some publishingCompany',
        author: 'some author',
        origin: 'some origin'
      }
    ];

    arrange.forEach((item) => {
      const isValid = validator.validate(item);
      expect(isValid).toBeTruthy();
      expect(validator.validatedData).toStrictEqual(new BookRules(item));
    });
  });
})
