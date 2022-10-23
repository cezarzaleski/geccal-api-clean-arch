import { mock, MockProxy } from 'jest-mock-extended';
import { GoDownLoanUseCase } from '#loan/application';
import { Loan, LoanRepository } from '#loan/domain';
import { getLoanPropertiesFake } from '#loan/domain/entities/loan-properties.fake';


describe('GoDownLoanUseCase Unit test', function () {

  let subject: GoDownLoanUseCase.UseCase;
  let repository: MockProxy<LoanRepository.Repository>
  let loan: Loan

  beforeEach(() => {
    repository = mock()
    subject = new GoDownLoanUseCase.UseCase(repository);
  });

  it('given a valid command when call go down loan use case with returned at is not null then return loan', async () => {
    const loanEntity = Loan.from(getLoanPropertiesFake());
    repository.findById.mockResolvedValue(loanEntity)
    repository.update.mockResolvedValue()
    const spyUpdate = jest.spyOn(repository, 'update');
    const returnedAtExpected = new Date()
    const props = {
      id: loanEntity.id,
      returnedAt: returnedAtExpected
    }

    const output = await subject.execute(props);

    loan = repository.update.mock.calls[0][0]
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: loan.id,
      returnedAt: returnedAtExpected
    });
  });
});
