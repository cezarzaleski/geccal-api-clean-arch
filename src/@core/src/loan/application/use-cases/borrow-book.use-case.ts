import { default as DefaultUseCase } from '#shared/application/use-case'
import { LoanOutput, LoanOutputMapper } from '#loan/application/dto/loan-output';
import LoanRepository from '#loan/domain/repository/loan.repository';
import { Loan, RegistrationId } from '#loan/domain';


export namespace BorrowBookUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private loanRepository: LoanRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const countPendingLoanRegistration = await this.loanRepository
        .countLoansPendingByRegistrationId(new RegistrationId(input.registrationId))
      const loan = Loan.from(input, countPendingLoanRegistration)
      await this.loanRepository.insert(loan);
      return LoanOutputMapper.toOutput(loan)
    }
  }

  export type Input = {
    registrationId: string
    bookId: string
    borrowedAt: Date
  };

  export type Output = LoanOutput
}