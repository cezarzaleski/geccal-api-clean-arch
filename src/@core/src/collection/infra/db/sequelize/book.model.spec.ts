import { BookSequelize } from '#collection/infra/db/sequelize/book.sequelize';
import { setupSequelize } from '#shared/infra';
import { PublisherSequelize } from '#collection/infra';
import { getPublisherPropertiesFake } from '#collection/domain/entities/__tests__/publisherPropertiesFake';
import { Publisher } from '#collection/domain';

describe('BookModel Unit Test', () => {
  setupSequelize({models: [BookSequelize.BookModel, PublisherSequelize.PublisherModel]})
  test('should create new BookModel', async () => {
    const publisherProps = getPublisherPropertiesFake()
    const publisher = Publisher.from(publisherProps)
    await PublisherSequelize.PublisherModel.create(publisher)
    const bookExpected = {
      id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      createdAt: new Date(),
      authors: ['Maria', 'Pedro'],
      edition: '1ª',
      name: 'A new Book',
      status: 'disponivel',
      publisherId: publisher.id,
      origin: 'doado'
    }
    const subject = await BookSequelize.BookModel.create(bookExpected)
    expect(subject.toJSON()).toStrictEqual(bookExpected)
  });
});
