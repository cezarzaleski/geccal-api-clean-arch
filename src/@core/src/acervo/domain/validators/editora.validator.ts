import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ClassValidatorFields } from '#shared/domain';
import { EditoraProperties } from '#acervo/domain';

export class EditoraRules {
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
              }: EditoraProperties) {
    Object.assign(this, {
      nome,
      ativo,
      criadoEm
    });
  }
}

export class EditoraValidator extends ClassValidatorFields<EditoraRules> {
  validate(data: EditoraProperties): boolean {
    return super.validate(new EditoraRules(data ?? {} as any));
  }
}


export class EditoraValidatorFactory {
  static create() {
    return new EditoraValidator();
  }
}

export default EditoraValidatorFactory;
