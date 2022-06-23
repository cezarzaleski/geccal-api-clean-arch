import { default as DefaultUseCase } from '#shared/application/use-case'
import LoanRepository from '#loan/domain/repository/loan.repository';


export namespace GoDownLoanUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private loanRepository: LoanRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const {id, returnedAt} = input
      const loan = await this.loanRepository.findById(id)
      loan.goDown(returnedAt)
      await this.loanRepository.update(loan);
      input.returnedAt = loan.returnedAt
      return {
        id: input.id,
        returnedAt: loan.returnedAt
      }
    }
  }

  export type Input = {
    id: string,
    returnedAt?: Date,
    lossJustification?: string,
    replacedBookId?: string
  };

  export type Output = {
    id: string,
    returnedAt: Date
  }
}
