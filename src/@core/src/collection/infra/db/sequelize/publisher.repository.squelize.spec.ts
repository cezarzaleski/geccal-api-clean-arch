import { PublisherSequelize } from '#collection/infra';
import { Publisher } from '#collection/domain';
import { setupSequelize } from '#shared/infra';
import { getPublisherPropertiesFake } from '#collection/domain/entities/__tests__/publisherPropertiesFake';
import { NotFoundError, UniqueEntityId } from '#shared/domain';

describe('PublisherSequelize Integration', () => {
  setupSequelize({models: [PublisherSequelize.PublisherModel]})
  let subject: PublisherSequelize.Repository
  let publisherProps = getPublisherPropertiesFake()
  let publisher = Publisher.from(publisherProps)

  beforeEach(async () => {
    subject = new PublisherSequelize.Repository(PublisherSequelize.PublisherModel)
  })

  test('should insert a new publisher entity', async () => {
    await subject.insert(publisher)
    const publisherModel = await PublisherSequelize.PublisherModel.findByPk(publisher.id)
    expect(publisherModel).not.toBeNull()
    expect(publisherModel.id).toEqual(publisher.id)
    expect(publisherModel.active).toBeTruthy()
    expect(publisherModel.name).toEqual(publisherProps.name)
    expect(publisherModel.deletedAt).toBeNull()
    expect(publisherModel.createdAt).not.toBeNull()
    expect(publisherModel.updatedAt).not.toBeNull()
    expect(publisherModel.createdAt).toEqual(publisherProps.createdAt)
    expect(publisherModel.updatedAt).toEqual(publisherProps.updatedAt)
  });

  test('should return Publisher when findById', async () => {
    await subject.insert(publisher)
    const publisherFind = await subject.findById(publisher.id)
    expect(publisherFind).not.toBeNull()
    expect(publisherFind).not.toBeUndefined()
    expect(publisher.id).toEqual(publisherFind.id)
    expect(publisher.name).toEqual(publisherFind.name)
    expect(publisher.active).toEqual(publisherFind.active)
    expect(publisher.deletedAt).toBeUndefined()
  });

  test('should throw NotFoundError when deleteAt is not null find by ID', async () => {
    const publisherProps = getPublisherPropertiesFake({deletedAt: new Date()})
    const publisherExpected = Publisher.from(publisherProps)
    await subject.insert(publisherExpected)
    await expect(() => subject.findById(publisherExpected.id))
      .rejects.toThrow(
        new NotFoundError(`Entity Not Found using ID ${publisherExpected.id}`)
      );
  });

  test('should delete publisher', async () => {
    await subject.insert(publisher)
    const deleteAt = new Date()
    await subject.delete(publisher.id, deleteAt)
    const entity = await PublisherSequelize.PublisherModel.findByPk(
      publisher.id
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
