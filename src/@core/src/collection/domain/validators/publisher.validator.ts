import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ClassValidatorFields } from '../../../@shared/domain/validators';
import { PublisherProperties } from '#collection/domain';

export class PublisherRules {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;

  constructor({
                name,
                createdAt,
                updatedAt
              }: PublisherProperties) {
    Object.assign(this, {
      name,
      createdAt,
      updatedAt
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
