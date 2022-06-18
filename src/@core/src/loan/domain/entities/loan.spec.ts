import LoanPropertiesFake from '#loan/domain/entities/loanPropertiesFake';
import { Loan } from '#loan/domain';


describe('Loan Unit Tests', function () {
  test('constructor of livro', () => {

    const loanProps = LoanPropertiesFake.build()
    const subject = Loan.from(loanProps)

    expect(subject.registrationId.value).toBe(loanProps.registrationId)
    expect(subject.bookId.value).toBe(loanProps.bookId)
  })
});
