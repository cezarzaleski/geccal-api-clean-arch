import { LoanProperties } from 'loan/domain/entities/loan';
import StatusLoan from '#loan/domain/entities/status-loan.vo';


export default class LoanPropertiesFake {
  static build({
                 registrationId = '9366b7dc-2d71-4799-b91c-c64adb205104',
                 bookId = '9366b7dc-2d71-4799-b91c-c64adb205104',
                 borrowedAt = new Date(),
                 returnedAt = null,
                 createdAt = new Date(),
                 status = StatusLoan.CONFIRMED.value,
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
