import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { LivroProperties } from '#acervo/livro/domain';
import { ClassValidatorFields } from '#shared/domain';

export class LivroRules {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsOptional()
  observacao: string;

  @IsNumber()
  @IsNotEmpty()
  exemplar: number;

  @IsString()
  @IsNotEmpty()
  editoraId: string;

  @IsArray()
  @IsNotEmpty()
  autores: Array<string>;

  @IsString()
  @IsNotEmpty()
  origem: string;

  @IsString()
  @IsNotEmpty()
  edicao: string;

  @IsBoolean()
  @IsOptional()
  ativo: boolean;

  @IsDate()
  @IsOptional()
  criadoEm: Date;

  constructor({
                nome,
                exemplar,
                situacao,
                edicao,
                observacao,
                editoraId,
                autores,
                origem,
                criadoEm
              }: LivroProperties) {
    Object.assign(this, {
      nome,
      exemplar,
      situacao,
      edicao,
      observacao,
      editoraId,
      autores,
      origem,
      criadoEm
    });
  }
}

export class LivroValidator extends ClassValidatorFields<LivroRules> {
  validate(data: LivroProperties): boolean {
    return super.validate(new LivroRules(data ?? {} as any));
  }
}


export class LivroValidatorFactory {
  static create() {
    return new LivroValidator();
  }
}

export default LivroValidatorFactory;
