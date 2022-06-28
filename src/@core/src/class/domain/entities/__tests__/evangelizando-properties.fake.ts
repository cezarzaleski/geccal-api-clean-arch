import { EvangelizandoProperties } from '#class/domain';


export default class EvangelizandoPropertiesFake {
  static build(
    {
      name = 'Evangelizando',
      sex = 'fem',
      fatherName = 'fatherName',
      motherName = 'motherName',
      birthday = new Date(),
      createdAt = new Date(),
    }: {
      name?: string,
      sex?: string,
      fatherName?: string,
      motherName?: string,
      birthday?: Date,
      createdAt?: Date,
    } = {}): EvangelizandoProperties {
    return {
      name: name,
      sex: sex,
      fatherName: fatherName,
      motherName: motherName,
      birthday: birthday,
      createdAt: createdAt,
    }
  }
}
