import { LoanProperties } from '#loan/domain';


export default class LoanPropertiesFake {
  static build({
                 registrationId = 'registrationId',
                 bookId = 'bookId',
                 borrowedAt = new Date(),
                 returnedAt = new Date(),
                 createdAt = new Date()
               }: {
                 registrationId?: string;
                 bookId?: string;
                 borrowedAt?: Date;
                 returnedAt?: Date,
                 createdAt?: Date
               } = {}
  ): LoanProperties {
    return {
      registrationId: registrationId,
      bookId: bookId,
      borrowedAt: borrowedAt,
      returnedAt: returnedAt,
      createdAt: createdAt,
    }
  }
}
