import { Book, Publisher } from '#collection/domain';
import { getBookPropertiesFake } from '#collection/domain/entities/__tests__/bookPropertiesFake';
import { BookSequelize } from '#collection/infra/db/sequelize/book.sequelize';
import { PublisherSequelize } from '#collection/infra';
import { setupSequelize } from '#shared/infra/testing/helpers/db';

describe('BookRepositorySequelize Integration', () => {
  let subject: BookSequelize.Repository
  const publisherProps = getBookPropertiesFake()
  const publisher = Publisher.from(publisherProps)

  setupSequelize({models: [BookSequelize.BookModel, PublisherSequelize.PublisherModel]})

  beforeEach(async () => {
    subject = new BookSequelize.Repository(BookSequelize.BookModel)
    PublisherSequelize.PublisherModel.create(PublisherSequelize.PublisherModelMapper.toModel(publisher))
  })

  test('should insert a new book entity', async () => {
    const bookProps = getBookPropertiesFake({publisherId: publisher.id})
    const book = Book.from(bookProps)
    await subject.insert(book)
    const bookModel = await BookSequelize.BookModel.findByPk(book.id)
    expect(bookModel).not.toBeNull()
  });
});
