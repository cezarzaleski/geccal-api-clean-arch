import Evangelizando from '#class/domain/entities/evangelizando';


export type EvangelizandoOutput = {
  id: string;
  name: string;
  sex: string;
  fatherName?: string;
  motherName?: string;
  birthday?: Date;
  createdAt?: Date;
};

export class EvangelizandoOutputMapper {
  static toOutput(entity: Evangelizando): EvangelizandoOutput {
    return {
      id: entity.id,
      name: entity.name,
      sex: entity.sex,
      fatherName: entity.fatherName,
      motherName: entity.motherName,
      birthday: entity.birthday,
      createdAt: entity.createdAt
    }
  }
}
