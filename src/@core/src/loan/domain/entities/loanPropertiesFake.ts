import { LoanProperties } from 'loan/domain/entities/loan';


export default class LoanPropertiesFake {
  static build({
                 registrationId = '9366b7dc-2d71-4799-b91c-c64adb205104',
                 bookId = '9366b7dc-2d71-4799-b91c-c64adb205104',
                 borrowedAt = new Date(),
                 returnedAt = null,
                 createdAt = new Date(),
               }: {
                 registrationId?: string;
                 bookId?: string;
                 borrowedAt?: Date,
                 returnedAt?: Date,
                 createdAt?: Date
               } = {}
  ): LoanProperties {
    return {
      registrationId: registrationId,
      bookId: bookId,
      borrowedAt: borrowedAt,
      returnedAt: returnedAt,
      createdAt: createdAt
    }
  }
}
