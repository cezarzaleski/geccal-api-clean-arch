import { setupSequelize } from '#shared/infra/testing/helpers/db';
import { EvangelizandoSequelize } from '#class/infra/db/sequelize/evangelizando.sequelize';
import { getEvangelizandoPropertiesFake } from '#class/domain/entities/__tests__/evangelizando-properties.fake';
import Evangelizando from '#class/domain/entities/evangelizando';
import { NotFoundError, UniqueEntityId } from '#shared/domain';

describe('EvangelizandoSequelize Integration', () => {
  let subject: EvangelizandoSequelize.Repository
  let evangelizandoProps = getEvangelizandoPropertiesFake()
  let evangelizando = Evangelizando.from(evangelizandoProps)

  setupSequelize({models: [EvangelizandoSequelize.EvangelizandoModel]})

  beforeEach(async () => {
    subject = new EvangelizandoSequelize.Repository(EvangelizandoSequelize.EvangelizandoModel)
  })

  test('should insert a new evangelizando entity', async () => {
    await subject.insert(evangelizando)
    const evangelizandoModel = await EvangelizandoSequelize.EvangelizandoModel.findByPk(evangelizando.id)
    expect(evangelizandoModel).not.toBeNull()
    const evangelizandoSaved = EvangelizandoSequelize.EvangelizandoModelMapper.toEntity(evangelizandoModel.toJSON())
    expect(evangelizando.id).toEqual(evangelizandoSaved.id)
    expect(evangelizando.name).toEqual(evangelizandoSaved.name)
    expect(evangelizando.gender.value).toEqual(evangelizandoSaved.gender.value)
    expect(evangelizando.fatherName).toEqual(evangelizandoSaved.fatherName)
    expect(evangelizando.motherName).toEqual(evangelizandoSaved.motherName)
    expect(evangelizando.birthday).toEqual(evangelizandoSaved.birthday)
    expect(evangelizando.deletedAt).toBeUndefined()
  });

  test('should return Evangelizando when findById', async () => {
    const evangelizandoExpected = evangelizando
    await subject.insert(evangelizandoExpected)
    const evangelizandoFind = await subject.findById(evangelizandoExpected.id)
    expect(evangelizandoFind).not.toBeNull()
    expect(evangelizandoExpected.id).toEqual(evangelizandoFind.id)
    expect(evangelizandoExpected.name).toEqual(evangelizandoFind.name)
    expect(evangelizandoExpected.gender.value).toEqual(evangelizandoFind.gender.value)
    expect(evangelizandoExpected.fatherName).toEqual(evangelizandoFind.fatherName)
    expect(evangelizandoExpected.motherName).toEqual(evangelizandoFind.motherName)
    expect(evangelizandoExpected.birthday).toEqual(evangelizandoFind.birthday)
    expect(evangelizandoExpected.deletedAt).toBeUndefined()
  });

  test('should throw NotFoundError when deleteAt is not null find by ID', async () => {
    const evangelizandoProps = getEvangelizandoPropertiesFake({deletedAt: new Date()})
    const evangelizandoExpected = Evangelizando.from(evangelizandoProps)
    await subject.insert(evangelizandoExpected)
    await expect(() => subject.findById(evangelizandoExpected.id))
      .rejects.toThrow(
        new NotFoundError(`Entity Not Found using ID ${evangelizandoExpected.id}`)
      );
  });

  test('should delete evangelizando', async () => {
    await subject.insert(evangelizando)
    const deleteAt = new Date()
    await subject.delete(evangelizando.id, deleteAt)
    const entity = await EvangelizandoSequelize.EvangelizandoModel.findByPk(
      evangelizando.id
    );
    expect(entity.deletedAt).toEqual(deleteAt)
  });

  it("should throw error on delete when a entity not found", async () => {
    await expect(subject.delete("fake id")).rejects.toThrow(
      new NotFoundError("Entity Not Found using ID fake id")
    );

    await expect(
      subject.delete(
        new UniqueEntityId("9366b7dc-2d71-4799-b91c-c64adb205104")
      )
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID 9366b7dc-2d71-4799-b91c-c64adb205104`
      )
    );
  });
});
