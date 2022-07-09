import { mock, MockProxy } from 'jest-mock-extended';
import { BorrowBookUseCase } from '#loan/application/use-cases/borrow-book.use-case';
import LoanRepository from '#loan/domain/repository/loan.repository';
import { Loan } from '#loan/domain';
import { v4 as uuidv4 } from 'uuid';
import { Book, BookRepository } from '#collection/domain';
import { getBookPropertiesFake } from '#collection/domain/entities/__tests__/bookPropertiesFake';
import StatusBook from '#collection/domain/entities/status-book.vo';
import { BookUnavailableToBorrowError } from '#loan/domain/erros';
import EventDispatcherInterface from '#shared/event/event-dispatcher.interface';


describe('BorrowBookUseCase Unit test', function () {

  let subject: BorrowBookUseCase.UseCase;
  let loanRepository: MockProxy<LoanRepository.Repository>
  let bookRepository: MockProxy<BookRepository.Repository>
  let eventDispatcherInterface: EventDispatcherInterface
  let loan: Loan

  beforeEach(() => {
    loanRepository = mock()
    bookRepository = mock()
    eventDispatcherInterface = mock()
    subject = new BorrowBookUseCase.UseCase(loanRepository, bookRepository, eventDispatcherInterface);
  });

  it('given a valid command when call create loan then return id loan', async () => {
    const book = Book.from(getBookPropertiesFake())
    const bookId = book.id
    bookRepository.findById.mockResolvedValue(book)
    const spyInsert = jest.spyOn(loanRepository, 'insert');
    const spyNotifyEvent = jest.spyOn(eventDispatcherInterface, 'notify');
    const spycountLoansPendingByRegistrationId = jest.spyOn(loanRepository, 'countLoansPendingByRegistrationId');
    const props = {
      bookId: bookId,
      registrationId: uuidv4(),
      borrowedAt: new Date()
    }

    const output = await subject.execute(props);

    loan = loanRepository.insert.mock.calls[0][0]
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(spyNotifyEvent).toHaveBeenCalledTimes(1);
    expect(spycountLoansPendingByRegistrationId).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: loan.id
    });
  });

  it('given a book unavailable when call create loan then throw BookUnavailableToBorrowError', async () => {
    const book = Book.from(getBookPropertiesFake({status: StatusBook.LOSS.value}))
    const bookId = book.id
    loanRepository.insert.mockResolvedValue()
    bookRepository.findById.mockResolvedValue(book)
    const spyInsert = jest.spyOn(loanRepository, 'insert');
    const spyBookRepositoryFindById = jest.spyOn(bookRepository, 'findById');
    const props = {
      bookId: bookId,
      registrationId: uuidv4(),
      borrowedAt: new Date()
    }

    await expect(() =>
      subject.execute(props)
    ).rejects.toThrow(new BookUnavailableToBorrowError(book));

    expect(spyInsert).toHaveBeenCalledTimes(0);
    expect(spyBookRepositoryFindById).toHaveBeenCalledTimes(1);
  });
});
