import { setupSequelize } from '#shared/infra/testing/helpers/db';
import { EvangelizandoSequelize } from '#class/infra/db/sequelize/evangelizando.sequelize';
import { getEvangelizandoPropertiesFake } from '#class/domain/entities/__tests__/evangelizando-properties.fake';
import Evangelizando from '#class/domain/entities/evangelizando';
import { ClassSequelize } from '#class/infra/db/sequelize/class.sequelize';
import Class from '#class/domain/entities/class';
import { getClassPropertiesFake } from '#class/domain/entities/__tests__/class-properties.fake';
import { NotFoundError, UniqueEntityId } from '#shared/domain';

describe('ClassSequelize Integration', () => {
  let subject: ClassSequelize.Repository
  let evangelizandoRepository: EvangelizandoSequelize.Repository
  let classProps = getClassPropertiesFake()
  let classEntity = Class.from(classProps)

  setupSequelize({
    models: [
      ClassSequelize.ClassModel,
      ClassSequelize.EnrollmentModel,
      EvangelizandoSequelize.EvangelizandoModel
    ]
  })

  beforeEach(async () => {
    subject = new ClassSequelize.Repository(ClassSequelize.ClassModel)
    evangelizandoRepository = new EvangelizandoSequelize.Repository(EvangelizandoSequelize.EvangelizandoModel)
  })

  test('should insert a new class entity', async () => {
    await subject.insert(classEntity)

    const classModel = await ClassSequelize.ClassModel.findByPk(classEntity.id)
    expect(classModel).not.toBeNull()
    const classSaved = ClassSequelize.ClassModelMapper.toEntity(classModel.toJSON())
    expect(classEntity.id).toEqual(classSaved.id)
    expect(classEntity.year).toEqual(classSaved.year)
    expect(classEntity.startAt).toEqual(classSaved.startAt)
    expect(classEntity.finishAt).toEqual(classSaved.finishAt)
    expect(classEntity.ciclo.value).toEqual(classSaved.ciclo.value)
  });

  test('should return Class when findById', async () => {
    const classEntityExpected = classEntity
    await subject.insert(classEntityExpected)

    const classFind = await subject.findById(classEntityExpected.id)

    expect(classFind).not.toBeNull()
    expect(classEntityExpected.id).toEqual(classFind.id)
    expect(classEntityExpected.finishAt).toEqual(classFind.finishAt)
    expect(classEntityExpected.startAt).toEqual(classFind.startAt)
    expect(classEntityExpected.ciclo.value).toEqual(classFind.ciclo.value)
    expect(classEntityExpected.year).toEqual(classFind.year)
    expect(classEntityExpected.deletedAt).toBeUndefined()
  });

  test('should throw NotFoundError when deleteAt is not null find by ID', async () => {
    const classProps = getClassPropertiesFake({deletedAt: new Date()})
    const classExpected = Class.from(classProps)
    await subject.insert(classExpected)

    await expect(() => subject.findById(classExpected.id))
      .rejects.toThrow(
        new NotFoundError(`Entity Not Found using ID ${classExpected.id}`)
      );
  });

  test('should delete class', async () => {
    await subject.insert(classEntity)
    const deleteAt = new Date()

    await subject.delete(classEntity.id, deleteAt)

    const entity = await ClassSequelize.ClassModel.findByPk(
      classEntity.id
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

  test('should add enrollment in the class', async () => {
    const evangelizando = Evangelizando.from(getEvangelizandoPropertiesFake())
    await subject.insert(classEntity)
    await evangelizandoRepository.insert(evangelizando)
    classEntity.addEnrollment(new UniqueEntityId(evangelizando.id))

    await subject.update(classEntity)

    const classFind = await subject.findById(classEntity.id)
    expect(classFind.deletedAt).toBeNull()
    expect(classFind.enrollments).not.toBeUndefined()
    expect(classFind.enrollments.length).toEqual(1)
    const enrollment = classFind.enrollments.pop()
    expect(evangelizando.id).toEqual(enrollment.evangelizandoId.value)
  });
});
