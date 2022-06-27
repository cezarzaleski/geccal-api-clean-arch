import { Entity, UniqueEntityId } from '#shared/domain';

export type EvangelizandoProperties = {
  name: string;
  fatherName: string;
  motherName: string;
  birthday: Date;
  sex: string;
  createdAt?: Date;
}

export default class Evangelizando extends Entity {
  private constructor(
    public name: string,
    public fatherName: string,
    public motherName: string,
    public birthday: Date,
    public sex: string,
    id: UniqueEntityId,
    public readonly createdAt: Date,
    public readonly updateAt: Date,
    public deletedAt?: Date,
  ) {
    super(id);
  }

  static from(props: EvangelizandoProperties) {
    props.createdAt = props.createdAt ?? new Date();
    const {name, fatherName, motherName, birthday, sex, createdAt} = props;
    return new Evangelizando(name, fatherName, motherName, birthday, sex, new UniqueEntityId(), createdAt, createdAt);
  }

  delete(deletedAt: Date) {
    this.deletedAt = deletedAt
  }
}
