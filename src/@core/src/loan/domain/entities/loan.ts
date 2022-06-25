import { EntityValidationError, UniqueEntityId } from '#shared/domain';
import Entity from '#shared/domain/entity/entity';
import { BookId, RegistrationId } from '#loan/domain';
import { LoanValidatorFactory } from '#loan/domain/validators/loan.validator';


export type LoanProperties = {
  registrationId: string,
  bookId: string,
  borrowedAt: Date,
  returnedAt?: Date,
  createdAt?: Date,
}

type LoanPropertiesUpdate = Omit<LoanProperties, 'createdAt'>

export class Loan extends Entity {
  private constructor(
    public registrationId: RegistrationId,
    public bookId: BookId,
    public readonly borrowedAt: Date,
    public returnedAt: Date,
    public readonly createdAt: Date,
    id: UniqueEntityId
  ) {
    super(id);
  }

  static from(props: LoanProperties, countPendingLoanRegistration: number = 0, id?: UniqueEntityId): Loan {
    if (countPendingLoanRegistration >= 2) throw new Error("Registration with 2 loans pending")
    props.createdAt = props.createdAt ?? new Date();
    Loan.validate(props);
    const registrationId = new RegistrationId(props.registrationId)
    const bookId = new BookId(props.bookId)
    const {borrowedAt, returnedAt, createdAt} = props
    return new Loan(registrationId, bookId, borrowedAt, returnedAt, createdAt, id)
  }

  static validate(props: LoanProperties) {
    const validator = LoanValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  returnABook(aReturnedAt?: Date) {
    aReturnedAt  = aReturnedAt || new Date()
    this.returnedAt = aReturnedAt
  }
}
