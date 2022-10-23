import { default as DefaultUseCase } from '#shared/application/use-case'
import { LoanOutput } from '#loan/application/dto/loan-output';
import LoanRepository from '#loan/domain/repository/loan.repository';
import { BookRepository } from '#collection/domain';
import AvailableBookService from '#loan/domain/entities/available-book.service';


export namespace UpdateLoanUseCase {
  export class UseCase implements DefaultUseCase<Input, void> {
    constructor(
      private loanRepository: LoanRepository.Repository,
      private bookRepository: BookRepository.Repository
    ) {}

    async execute(input: Input): Promise<void> {
      const {bookId, registrationId, id} = input
      const loan = await this.loanRepository.findById(id)
      const book = await this.bookRepository.findById(bookId)
      AvailableBookService.available(book)
      loan.update(bookId, registrationId)
      await this.loanRepository.update(loan);
    }
  }

  export type Input = {
    id: string
    registrationId: string
    bookId: string
  };

  export type Output = LoanOutput
}
