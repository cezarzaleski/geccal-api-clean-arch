import { Loan } from '#loan/domain';


export type LoanOutput = {
  id: string
};

export class LoanOutputMapper {
  static toOutput(entity: Loan): LoanOutput {
    return {
      id: entity.id
    }
  }
}
