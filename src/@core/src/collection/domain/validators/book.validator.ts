import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString,   NotEquals} from 'class-validator';
import { BookProperties } from '#collection/domain';
import { ClassValidatorFields } from '#shared/domain';

export class BookRules {

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
              }: BookProperties
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

export class BookValidator extends ClassValidatorFields<BookRules> {
  validate(data: BookProperties): boolean {
    return super.validate(new BookRules(data ?? {} as any));
  }
}


export class BookValidatorFactory {
  static create() {
    return new BookValidator();
  }
}
