import { PublisherSequelize } from '#collection/infra';
import { Publisher } from '#collection/domain';
import { setupSequelize } from '#shared/infra';
import { getPublisherPropertiesFake } from '#collection/domain/entities/__tests__/publisherPropertiesFake';

describe('PublisherSequelize Integration', () => {
  setupSequelize({models: [PublisherSequelize.PublisherModel]})
  let subject: PublisherSequelize.Repository

  beforeEach(async () => {
    subject = new PublisherSequelize.Repository(PublisherSequelize.PublisherModel)
  })

  test('should insert a new publisher entity', async () => {
    const publisherProps = getPublisherPropertiesFake()
    const publisher = Publisher.from(publisherProps)
    await subject.insert(publisher)
    const publisherModel = await PublisherSequelize.PublisherModel.findByPk(publisher.id)
    expect(publisherModel).not.toBeNull()
    expect(publisherModel.id).not.toBeNull()
    expect(publisherModel.name).toEqual(publisherProps.name)
    expect(publisherModel.deletedAt).toBeNull()
    expect(publisherModel.createdAt).toEqual(publisherProps.createdAt)
    expect(publisherModel.updatedAt).toEqual(publisherProps.updatedAt)
  });
});
