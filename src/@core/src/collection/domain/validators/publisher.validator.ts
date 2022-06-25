import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ClassValidatorFields } from '../../../@shared/domain/validators';
import { PublisherProperties } from '#collection/domain';

export class PublisherRules {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  ativo: boolean;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  constructor({
                name,
                ativo,
                createdAt
              }: PublisherProperties) {
    Object.assign(this, {
      name,
      ativo,
      createdAt
    });
  }
}

export class PublisherValidator extends ClassValidatorFields<PublisherRules> {
  validate(data: PublisherProperties): boolean {
    return super.validate(new PublisherRules(data ?? {} as any));
  }
}


export class PublisherValidatorFactory {
  static create() {
    return new PublisherValidator();
  }
}

export default PublisherValidatorFactory;
