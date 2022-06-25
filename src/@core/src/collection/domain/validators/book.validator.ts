import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString,   NotEquals} from 'class-validator';
import { BookProperties } from '#collection/domain';
import { ClassValidatorFields } from '#shared/domain';

export class BookRules {

  @IsString()
  @IsNotEmpty()
  @NotEquals(null)
  name: string;

  @IsString()
  @IsOptional()
  note: string;

  @NotEquals(null)
  exemplary: number;

  @IsString()
  @IsNotEmpty()
  @NotEquals(null)
  publisherId: string;

  @IsArray({message:"authors should not be list"})
  @IsNotEmpty()
  @NotEquals(null)
  authors: Array<string>;

  @IsString()
  @IsNotEmpty()
  @NotEquals(null)
  origin: string;

  @IsString()
  @IsNotEmpty()
  @NotEquals(null)
  edition: string;

  @IsBoolean()
  @IsOptional()
  ativo: boolean;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  constructor({
                name,
                exemplary,
                status,
                edition,
                note,
                publisherId,
                authors,
                origin,
                createdAt
              }: BookProperties
  ) {
    Object.assign(this, {
      name: name,
      exemplary: exemplary,
      status: status,
      edition: edition,
      note: note,
      publisherId: publisherId,
      authors: authors,
      origin: origin,
      createdAt: createdAt
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
