import { EvangelizandoProperties } from '#class/domain';
import Gender from '#class/domain/entities/gender.vo';


const evangelizandoPropertiesFake: EvangelizandoProperties = {

  name: 'Evangelizando',
  gender: Gender.FEMALE.value,
  fatherName: 'fatherName',
  motherName: 'motherName',
  birthday: new Date(),
  createdAt: new Date()
}

export const getEvangelizandoPropertiesFake = (
  evangelizandoProperties?: Partial<EvangelizandoProperties>,
) => ({
  ...evangelizandoPropertiesFake,
  ...evangelizandoProperties,
});
