import { mock, MockProxy } from 'jest-mock-extended';
import LoanRepository from '#loan/domain/repository/loan.repository';
import { Loan } from '#loan/domain';
import { v4 as uuidv4 } from 'uuid';
import { Book, BookRepository } from '#collection/domain';
import { getBookPropertiesFake } from '#collection/domain/entities/__tests__/bookPropertiesFake';
import { UpdateLoanUseCase } from '#loan/application/use-cases/update-loan.use-case';
import { getLoanPropertiesFake } from '#loan/domain/entities/loan-properties.fake';


describe('UpdateLoanUseCase Unit test', function () {

  let subject: UpdateLoanUseCase.UseCase;
  let loanRepository: MockProxy<LoanRepository.Repository>
  let bookRepository: MockProxy<BookRepository.Repository>
  let loan: Loan

  beforeEach(() => {
    loanRepository = mock()
    bookRepository = mock()
    subject = new UpdateLoanUseCase.UseCase(loanRepository, bookRepository);
  });

  it('should return success when call update loan', async () => {
    const loan = Loan.from(getLoanPropertiesFake())
    const book = Book.from(getBookPropertiesFake())
    const bookId = uuidv4()
    const registrationId = uuidv4()
    bookRepository.findById.mockResolvedValue(book)
    loanRepository.findById.mockResolvedValue(loan)
    const spyUpdate = jest.spyOn(loanRepository, 'update');
    const props = {
      id: loan.id,
      bookId: bookId,
      registrationId: registrationId,
    }

    await subject.execute(props);

    expect(spyUpdate).toHaveBeenCalledTimes(1);
  });
});
