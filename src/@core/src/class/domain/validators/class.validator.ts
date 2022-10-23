import { IsDate, IsNotEmpty, IsString, NotEquals, IsNumber } from 'class-validator';
import { ClassProperties } from 'class/domain';
import { ClassValidatorFields } from '#shared/domain';

export class ClassRules {
  @IsDate()
  @NotEquals(null)
  startAt: Date;

  @IsDate()
  @NotEquals(null)
  finishAt: Date;

  @IsNumber()
  @NotEquals(null)
  year: number;

  @IsString()
  @IsNotEmpty()
  ciclo: string;

  constructor(
    {
      startAt, finishAt, year, ciclo
    }: ClassProperties) {
    Object.assign(this, {
      startAt: startAt,
      finishAt: finishAt,
      year: year,
      ciclo: ciclo,
    });
  }
}

export class ClassValidator extends ClassValidatorFields<ClassRules> {
  validate(data: ClassProperties): boolean {
    return super.validate(new ClassRules(data ?? {} as any));
  }
}


export class ClassValidatorFactory {
  static create(): ClassValidator {
    return new ClassValidator();
  }
}
