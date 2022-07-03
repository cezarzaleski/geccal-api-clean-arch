import { EvangelizandoProperties } from '#class/domain';


const evangelizandoPropertiesFake: EvangelizandoProperties = {

  name: 'Evangelizando',
  sex: 'fem',
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
