import ClassValidatorFields from '../../../../@shared/domain/validators/class-validator-fields';
import { AutorProperties } from '../entities/autor';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AutorRules {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsBoolean()
  @IsOptional()
  ativo: boolean;

  @IsDate()
  @IsOptional()
  criadoEm: Date;

  constructor({
                nome,
                ativo,
                criadoEm
              }: AutorProperties) {
    Object.assign(this, {
      nome,
      ativo,
      criadoEm
    });
  }
}

export class AutorValidator extends ClassValidatorFields<AutorRules> {
  validate(data: AutorProperties): boolean {
    return super.validate(new AutorRules(data ?? {} as any));
  }
}


export class AutorValidatorFactory {
  static create() {
    return new AutorValidator();
  }
}

export default AutorValidatorFactory;
