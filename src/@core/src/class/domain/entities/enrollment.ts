import { EvangelizandoId } from '#class/domain/entities/value-objects';
import { Entity, UniqueEntityId } from '#shared/domain';

export type EnrollmentProperties = {
  evangelizandoId: EvangelizandoId;
  createAt: Date
}

export default class Enrollment extends Entity {
  private constructor(
    public evangelizandoId: EvangelizandoId,
    public createdAt: Date,
    id?: UniqueEntityId,
  ) {
    super(id);
  }

  static from(props: EnrollmentProperties) {
    const { evangelizandoId, createAt } = props;
    return new Enrollment(
      evangelizandoId,
      createAt
    );
  }
}
