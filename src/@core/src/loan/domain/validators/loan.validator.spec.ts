import { LoanValidator, LoanValidatorFactory } from '#loan/domain/validators/loan.validator';
import { LoanProperties } from '#loan/domain';
import LoanPropertiesFake from '#loan/domain/entities/loanPropertiesFake';

describe('LoanValidator Unit Tests', () => {
  let validator: LoanValidator;
  let props: LoanProperties

  beforeEach(() => {
    validator = LoanValidatorFactory.create()
    props = LoanPropertiesFake.build()

  });

  test('given a loan with registrationId is null return invalid loan', () => {
    props = LoanPropertiesFake.build({registrationId: null})
    validator.validate(props)
    expect(validator.errors).toStrictEqual({
      registrationId: [
        "registrationId should not be equal to null",
        "registrationId should not be empty",
        "registrationId must be a string",
      ]
    })
  })

  test('given a loan with bookId is null return invalid loan', () => {
    props = LoanPropertiesFake.build({bookId: null})
    validator.validate(props)
    expect(validator.errors).toStrictEqual({
      bookId: [
        "bookId should not be equal to null",
        "bookId should not be empty",
        "bookId must be a string",
      ]
    })
  })

  test('given a loan with bookId is empty return invalid loan', () => {
    props = LoanPropertiesFake.build({bookId: ''})
    validator.validate(props)
    expect(validator.errors).toStrictEqual({
      bookId: [
        "bookId should not be empty",
      ]
    })
  })

  test('given a loan with borrowedAt is null return invalid loan', () => {
    props = LoanPropertiesFake.build({borrowedAt: null})
    validator.validate(props)
    expect(validator.errors).toStrictEqual({
      borrowedAt: [
        "borrowedAt should not be equal to null",
        "borrowedAt must be a Date instance",
      ]
    })
  })
});
