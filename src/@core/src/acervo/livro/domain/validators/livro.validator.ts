import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString,   NotEquals} from 'class-validator';
import { LivroProperties } from '#acervo/livro/domain';
import { ClassValidatorFields } from '#shared/domain';

export class LivroRules {

  @IsString()
  @IsNotEmpty()
  @NotEquals(null)
  nome: string;

  @IsString()
  @IsOptional()
  observacao: string;

  @NotEquals(null)
  exemplar: number;

  @IsString()
  @IsNotEmpty()
  @NotEquals(null)
  editoraId: string;

  @IsArray({message:"autores should not be list"})
  @IsNotEmpty()
  @NotEquals(null)
  autores: Array<string>;

  @IsString()
  @IsNotEmpty()
  @NotEquals(null)
  origem: string;

  @IsString()
  @IsNotEmpty()
  @NotEquals(null)
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
              }: LivroProperties
  ) {
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
