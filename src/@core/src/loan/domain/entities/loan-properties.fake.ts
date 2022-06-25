import { LoanProperties } from 'loan/domain/entities/loan';
import StatusLoan from '#loan/domain/entities/status-loan.vo';
import { v4 as uuidv4 } from 'uuid';


export default class LoanPropertiesFake {
  static build({
                 registrationId = uuidv4(),
                 bookId = uuidv4(),
                 borrowedAt = new Date(),
                 returnedAt = null,
                 createdAt = new Date(),
                 status = StatusLoan.CREATED.value,
                 lossJustification = null,
                replacedBookId = null,
               }: {
                 registrationId?: string;
                 bookId?: string;
                 borrowedAt?: Date,
                 returnedAt?: Date,
                 createdAt?: Date
                 status?: string,
                 lossJustification?: string,
                 replacedBookId?: string,
               } = {}
  ): LoanProperties {
    return {
      registrationId: registrationId,
      bookId: bookId,
      borrowedAt: borrowedAt,
      returnedAt: returnedAt,
      createdAt: createdAt,
      status: status,
      lossJustification: lossJustification,
      replacedBookId: replacedBookId
    }
  }
}
