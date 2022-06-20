import { mock, MockProxy } from 'jest-mock-extended';
import { BorrowBookUseCase } from '#loan/application/use-cases/borrow-book.use-case';
import LoanRepository from '#loan/domain/repository/loan.repository';
import { Loan } from '#loan/domain';
import { v4 as uuidv4 } from 'uuid';


describe('BorrowBookUseCase Unit test', function () {

  let subject: BorrowBookUseCase.UseCase;
  let repository: MockProxy<LoanRepository.Repository>
  let loan: Loan

  beforeEach(() => {
    repository = mock()
    subject = new BorrowBookUseCase.UseCase(repository);
  });

  it('given a valid command when call create loan then return id loan', async () => {
    repository.insert.mockResolvedValue()
    const spyInsert = jest.spyOn(repository, 'insert');
    const spycountLoansPendingByRegistrationId = jest.spyOn(repository, 'countLoansPendingByRegistrationId');
    const props = {
      bookId: uuidv4(),
      registrationId: uuidv4(),
      borrowedAt: new Date()
    }

    const output = await subject.execute(props);

    loan = repository.insert.mock.calls[0][0]
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(spycountLoansPendingByRegistrationId).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: loan.id
    });
  });
});
