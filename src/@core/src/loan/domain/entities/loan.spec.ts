import { Loan } from '#loan/domain';
import StatusLoan from '#loan/domain/entities/status-loan.vo';
import LoanPropertiesFake from '#loan/domain/entities/loan-properties.fake';


describe('Loan Unit Tests', function () {
  test('constructor of loan', () => {

    const loanProps = LoanPropertiesFake.build()
    const subject = Loan.from(loanProps)

    expect(subject.registrationId.value).toBe(loanProps.registrationId)
    expect(subject.bookId.value).toBe(loanProps.bookId)
  })

  test('given a registration pending 2 loans when call create loan should return exception', () => {
    const loanProps = LoanPropertiesFake.build()
    expect(() => Loan.from(loanProps, 2))
      .toThrow(Error("Registration with 2 loans pending"))
  })

  test('given a loan when call returnABook method then returnedAt is not null', () => {
    const loanProps = LoanPropertiesFake.build({returnedAt: null})

    const subject = Loan.from(loanProps)

    expect(subject.returnedAt).toBeNull()
    subject.returnABook(StatusLoan.RETURNED)
    expect(subject.returnedAt).not.toBeNull()
    expect(subject.status.value).toBe(StatusLoan.RETURNED.value)
  })

  test('should return throw exception when LOSS_WITHOUT_REPOSITION and lossJustification is empty', () => {
    const loanProps = LoanPropertiesFake.build({returnedAt: null})
    const subject = Loan.from(loanProps)

    expect(() =>
      subject.returnABook(StatusLoan.LOSS_WITHOUT_REPOSITION)
    ).toThrow(new Error('Loss justification is required'))
  })
})
;
