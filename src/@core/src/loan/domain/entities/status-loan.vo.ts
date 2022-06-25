import { ValueObject } from '#shared/domain';
import InvalidStatusLoanError from '#loan/domain/erros/invalid-status-loan.error';

enum StatusLoanEnum {
  CREATED = 'CREATED',
  CANCELED = 'CANCELED',
  RETURNED = 'RETURNED',
  LOSS_WITH_REPOSITION = 'LOSS_WITH_REPOSITION',
  LOSS_WITHOUT_REPOSITION = 'LOSS_WITHOUT_REPOSITION',
}
export default class StatusLoan extends ValueObject<string> {
  static CANCELED = new StatusLoan(StatusLoanEnum.CANCELED)
  static CREATED = new StatusLoan(StatusLoanEnum.CREATED)
  static RETURNED = new StatusLoan(StatusLoanEnum.RETURNED)
  static LOSS_WITH_REPOSITION = new StatusLoan(StatusLoanEnum.LOSS_WITH_REPOSITION)
  static LOSS_WITHOUT_REPOSITION = new StatusLoan(StatusLoanEnum.LOSS_WITHOUT_REPOSITION)

  static from (value: string) {
    StatusLoan.validate(value)
    return new StatusLoan(value)
  }

  equals(aStatusLoan: StatusLoan) : boolean {
    return this.value === aStatusLoan.value;
  }

  static validate(value) {
    const invalidStatus = !Object.values(StatusLoanEnum).includes(value)
      if (invalidStatus) throw new InvalidStatusLoanError();
  }
}
