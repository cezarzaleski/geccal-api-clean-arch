import { mock, MockProxy } from 'jest-mock-extended';
import { CreateLoanUseCase } from '#loan/application/use-cases/create-loan.use-case';
import LoanRepository from '#loan/domain/repository/loan.repository';
import { Loan } from '#loan/domain';
import { v4 as uuidv4 } from 'uuid';


describe('CreateLoanUseCase Unit test', function () {

  let subject: CreateLoanUseCase.UseCase;
  let repository: MockProxy<LoanRepository.Repository>
  let loan: Loan

  beforeEach(() => {
    repository = mock()
    subject = new CreateLoanUseCase.UseCase(repository);
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
