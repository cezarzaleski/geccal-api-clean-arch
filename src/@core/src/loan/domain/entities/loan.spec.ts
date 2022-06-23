import { Loan, LoanProperties } from '#loan/domain';
import StatusLoan from '#loan/domain/entities/status-loan.vo';
import LoanPropertiesFake from '#loan/domain/entities/loan-properties.fake';

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

  test('given a loan when call returnABook method then returnedAt is not null', () => {
    const returnedAtExpected = new Date()

    subject.returnABook(returnedAtExpected)

    expect(subject.returnedAt).toBe(returnedAtExpected)
    expect(subject.status.value).toBe(StatusLoan.RETURNED.value)
  })

  test('given a loan with returned with reposition book when call returnABook then status book is LOSS_WITHOUT_REPOSITION', () => {
    const lossJustification = 'lossJustification'

    subject.returnABook(null, lossJustification)

    expect(subject.returnedAt).toBeNull()
    expect(subject.status.value).toBe(StatusLoan.LOSS_WITHOUT_REPOSITION.value)
    expect(subject.lossJustification).toBe(lossJustification)
  })
});
