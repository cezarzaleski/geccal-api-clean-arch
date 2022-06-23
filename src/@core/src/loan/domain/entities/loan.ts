import { EntityValidationError, UniqueEntityId } from '#shared/domain';
import Entity from '#shared/domain/entity/entity';
import { BookId, RegistrationId } from '#loan/domain';
import { LoanValidatorFactory } from '#loan/domain/validators/loan.validator';
import StatusLoan from '#loan/domain/entities/status-loan.vo';


export type LoanProperties = {
  registrationId: string,
  bookId: string,
  borrowedAt: Date,
  status: string,
  lossJustification?: string,
  replacedBookId?: string,
  returnedAt?: Date,
  createdAt?: Date,
}

type LoanPropertiesUpdate = Omit<LoanProperties, 'createdAt'>

export class Loan extends Entity {
  private constructor(
    public registrationId: RegistrationId,
    public bookId: BookId,
    public readonly borrowedAt: Date,
    public readonly createdAt: Date,
    id: UniqueEntityId,
    public status: StatusLoan,
    public returnedAt?: Date,
    public replacedBookId?: BookId,
    public lossJustification?: string,
  ) {
    super(id);
  }

  static from(props: LoanProperties, countPendingLoanRegistration: number = 0, id?: UniqueEntityId): Loan {
    if (countPendingLoanRegistration >= 2) throw new Error("Registration with 2 loans pending")
    props.createdAt = props.createdAt ?? new Date();
    Loan.validate(props);
    const registrationId = new RegistrationId(props.registrationId)
    const bookId = new BookId(props.bookId)
    let aReplacedBookId: BookId | undefined
    const {borrowedAt, returnedAt, createdAt, replacedBookId, lossJustification} = props
    if (replacedBookId) aReplacedBookId = new BookId(replacedBookId)
    const status = StatusLoan.from(props.status)
    return new Loan(registrationId, bookId, borrowedAt, createdAt, id, status, returnedAt, aReplacedBookId, lossJustification)
  }

  static validate(props: LoanProperties) {
    const validator = LoanValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  goDown(aReturnedAt?: Date, lossJustification?: string, replacedBookId?: BookId): void {
    if (aReturnedAt) {
      this.returnedAt = aReturnedAt;
      this.status = StatusLoan.RETURNED;
    }
    if (!aReturnedAt && lossJustification) {
      this.status = StatusLoan.LOSS_WITHOUT_REPOSITION;
      this.lossJustification = lossJustification;
    }
    if (!aReturnedAt && replacedBookId) {
      this.status = StatusLoan.LOSS_WITH_REPOSITION;
      this.replacedBookId = replacedBookId;
    }
    if (!aReturnedAt && !lossJustification && !replacedBookId) throw new Error('Loss justification is required')
  }
}
