import { default as DefaultUseCase } from '#shared/application/use-case'
import { LoanOutput, LoanOutputMapper } from '#loan/application/dto/loan-output';
import LoanRepository from '#loan/domain/repository/loan.repository';
import { Loan, RegistrationId } from '#loan/domain';
import { BookRepository } from '#collection/domain';
import AvailableBookService from '#loan/domain/entities/available-book.service';
import StatusLoan from '#loan/domain/entities/status-loan.vo';
import EventDispatcherInterface from '#shared/event/event-dispatcher.interface';
import BorrowBookCreated from '#loan/domain/events/borrow-book-created.event';


export namespace BorrowBookUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private loanRepository: LoanRepository.Repository,
      private bookRepository: BookRepository.Repository,
      private eventDispatcherInterface: EventDispatcherInterface
    ) {}

    async execute(input: Input): Promise<Output> {
      const {bookId, registrationId} = input
      const book = await this.bookRepository.findById(bookId)
      AvailableBookService.available(book)
      const countPendingLoanRegistration = await this.loanRepository
        .countLoansPendingByRegistrationId(new RegistrationId(registrationId))
      const loan = Loan.from({...input, status: StatusLoan.CREATED.value}, countPendingLoanRegistration)
      await this.loanRepository.insert(loan);
      const borrowBookCreated = new BorrowBookCreated({...loan})
      this.eventDispatcherInterface.notify(borrowBookCreated)
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
