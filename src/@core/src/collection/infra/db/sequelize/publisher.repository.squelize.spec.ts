import { PublisherSequelize } from '#collection/infra';
import { Publisher } from '#collection/domain';
import { setupSequelize } from '#shared/infra';
import { getPublisherPropertiesFake } from '#collection/domain/entities/__tests__/publisherPropertiesFake';

describe('PublisherSequelize Integration', () => {
  let subject: PublisherSequelize.Repository

  setupSequelize({models: [PublisherSequelize.PublisherModel]})

  beforeEach(async () => {
    subject = new PublisherSequelize.Repository(PublisherSequelize.PublisherModel)
  })

  test('should insert a new publisher entity', async () => {
    const publisherProps = getPublisherPropertiesFake()
    const publisher = Publisher.from(publisherProps)
    await subject.insert(publisher)
    const publisherModel = await PublisherSequelize.PublisherModel.findByPk(publisher.id)
    expect(publisherModel).not.toBeNull()
  });
});
