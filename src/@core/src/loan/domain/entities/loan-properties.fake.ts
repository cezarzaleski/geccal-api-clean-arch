import { LoanProperties } from 'loan/domain/entities/loan';
import StatusLoan from '#loan/domain/entities/status-loan.vo';
import { v4 as uuidv4 } from 'uuid';


const loanPropertiesFake: LoanProperties = {

  registrationId: uuidv4(),
  bookId: uuidv4(),
  borrowedAt: new Date(),
  returnedAt: null,
  createdAt: new Date(),
  status: StatusLoan.CREATED.value,
  lossJustification: null,
  replacedBookId: null,
}

export const getLoanPropertiesFake = (
  loanProperties?: Partial<LoanProperties>,
) => ({
  ...loanPropertiesFake,
  ...loanProperties,
});
