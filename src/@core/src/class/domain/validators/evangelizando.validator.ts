import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ClassValidatorFields } from '#shared/domain';
import { EvangelizandoProperties } from '#class/domain';

export class EvangelizandoRules {
  @IsString()
  @IsNotEmpty()
  name: String;

  @IsString()
  @IsNotEmpty()
  sex: String;

  @IsString()
  @IsOptional()
  fatherName: String;

  @IsString()
  @IsOptional()
  motherName: String;

  @IsDate()
  @IsOptional()
  birthday: Date;

  constructor(
    {
      name, gender, fatherName, motherName, birthday
    }: EvangelizandoProperties) {
    Object.assign(this, {
      name: name,
      sex: gender,
      fatherName: fatherName,
      motherName: motherName,
      birthday: birthday,
    });
  }
}

export class EvangelizandoValidator extends ClassValidatorFields<EvangelizandoRules> {
  validate(data: EvangelizandoProperties): boolean {
    return super.validate(new EvangelizandoRules(data ?? {} as any));
  }
}


export class EvangelizandoValidatorFactory {
  static create(): EvangelizandoValidator {
    return new EvangelizandoValidator();
  }
}
