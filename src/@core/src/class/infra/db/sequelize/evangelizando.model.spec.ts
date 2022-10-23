import { setupSequelize } from '#shared/infra';
import { EvangelizandoSequelize } from '#class/infra/db/sequelize/evangelizando.sequelize';

describe('EvangelizandoModel Unit Test', () => {
  setupSequelize({models: [EvangelizandoSequelize.EvangelizandoModel]})

  test('should create new EvangelizandoModel', async () => {
    const evangelizandoExpected = {
      id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      createdAt: new Date(),
      name: 'Evangelizando',
      gender: 'gender',
      fatherName: 'fatherName',
      motherName: 'motherName',
    }
    const subject = await EvangelizandoSequelize.EvangelizandoModel.create(evangelizandoExpected)
    expect(subject.toJSON()).toStrictEqual(evangelizandoExpected)
  });
});
