import { BookId, Loan, LoanProperties } from '#loan/domain';
import StatusLoan from '#loan/domain/entities/status-loan.vo';
import LoanPropertiesFake from '#loan/domain/entities/loan-properties.fake';
import { v4 as uuidv4 } from 'uuid';

describe('Loan Unit Tests', function () {
  let loanProps: LoanProperties;
  let subject: Loan;
  beforeEach(() => {
    loanProps = LoanPropertiesFake.build()
    subject = Loan.from(loanProps)
  });

  test('constructor of loan', () => {

    const loanProps = LoanPropertiesFake.build()
    const result = Loan.from(loanProps)

    expect(result.registrationId.value).toBe(loanProps.registrationId)
    expect(result.bookId.value).toBe(loanProps.bookId)
  })

  test('given a registration pending 2 loans when call create loan should return exception', () => {
    const loanProps = LoanPropertiesFake.build()
    expect(() => Loan.from(loanProps, 2))
      .toThrow(Error("Registration with 2 loans pending"))
  })

  test('given a loan when call goDown method then returnedAt is not null', () => {
    const returnedAtExpected = new Date()

    subject.goDown(returnedAtExpected)

    expect(subject.returnedAt).toBe(returnedAtExpected)
    expect(subject.status.value).toBe(StatusLoan.RETURNED.value)
  })

  test('given a loan with returned without reposition book when call goDown then status book is LOSS_WITHOUT_REPOSITION', () => {
    const lossJustification = 'lossJustification'

    subject.goDown(null, lossJustification)

    expect(subject.returnedAt).toBeNull()
    expect(subject.status.value).toBe(StatusLoan.LOSS_WITHOUT_REPOSITION.value)
    expect(subject.lossJustification).toBe(lossJustification)
    expect(subject.replacedBookId).toBeUndefined()
  })

  test('given a loan with returned with reposition book when call goDown then status book is LOSS_WITH_REPOSITION', () => {
    const replacedBookId = new BookId(uuidv4())

    subject.goDown(null, null, replacedBookId)

    expect(subject.returnedAt).toBeNull()
    expect(subject.status.value).toBe(StatusLoan.LOSS_WITH_REPOSITION.value)
    expect(subject.replacedBookId).toBe(replacedBookId)
    expect(subject.lossJustification).toBeNull()
  })

  test('should update fields loan', () => {
    const loanUpdateProps = LoanPropertiesFake.build({registrationId: uuidv4()})

    subject.update(loanUpdateProps)
    expect(loanUpdateProps.registrationId).toBe(subject.registrationId.value)
    expect(loanUpdateProps.bookId).toBe(subject.bookId.value)
  })
});
