import LoanPropertiesFake from '#loan/domain/entities/loanPropertiesFake';
import { Loan } from '#loan/domain';


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
});
