import ClassValidatorFields from '../../../@shared/domain/validators/class-validator-fields';
import { BookProperties } from '../entities/book';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BookRules {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  exemplary: number;

  @IsString()
  @IsNotEmpty()
  publishingCompany: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  edition: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  constructor({
                name,
                exemplary,
                isActive,
                edition,
                description,
                publishingCompany,
                author,
                origin,
                createdAt,
              }: BookProperties) {
    Object.assign(this, {
      name,
      exemplary,
      isActive,
      edition,
      description,
      publishingCompany,
      author,
      origin,
      createdAt,
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

export default BookValidatorFactory;
