import { IsDate, IsNotEmpty, IsOptional, IsString, NotEquals } from 'class-validator';
import { ClassValidatorFields } from '#shared/domain';
import { LoanProperties } from '#loan/domain';

export class LoanRules {
  @IsString()
  @IsNotEmpty()
  @NotEquals(null)
  registrationId: string;

  @IsString()
  @IsNotEmpty()
  @NotEquals(null)
  bookId: string;

  @IsDate()
  @NotEquals(null)
  borrowedAt: Date;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  returnedAt: Date;

  constructor({
                registrationId,
                bookId,
                borrowedAt,
                createdAt,
                returnedAt
              }: LoanProperties
  ) {
    Object.assign(this, {
      registrationId,
      bookId,
      borrowedAt,
      createdAt,
      returnedAt
    });
  }
}

export class LoanValidator extends ClassValidatorFields<LoanRules> {
  validate(data: LoanProperties): boolean {
    return super.validate(new LoanRules(data ?? {} as any));
  }
}

export class LoanValidatorFactory {
  static create() {
    return new LoanValidator();
  }
}
