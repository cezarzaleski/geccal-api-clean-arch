import { Book, Publisher } from '#collection/domain';
import { getBookPropertiesFake } from '#collection/domain/entities/__tests__/bookPropertiesFake';
import { getPublisherPropertiesFake } from '#collection/domain/entities/__tests__/publisherPropertiesFake';
import { BookSequelize } from '#collection/infra/db/sequelize/book.sequelize';
import { PublisherSequelize } from '#collection/infra';
import { setupSequelize } from '#shared/infra/testing/helpers/db';

describe('BookRepositorySequelize Integration', () => {
  let subject: BookSequelize.Repository
  const publisherProps = getPublisherPropertiesFake()
  const publisher = Publisher.from(publisherProps)

  setupSequelize({models: [BookSequelize.BookModel, PublisherSequelize.PublisherModel]})

  beforeEach(async () => {
    subject = new BookSequelize.Repository(BookSequelize.BookModel)
    await PublisherSequelize.PublisherModel.create(PublisherSequelize.PublisherModelMapper.toModel(publisher))
  })

  test('should insert a new book entity', async () => {
    const bookProps = getBookPropertiesFake({publisherId: publisher.id})
    const book = Book.from(bookProps)
    await subject.insert(book)
    const bookModel = await BookSequelize.BookModel.findByPk(book.id)
    expect(bookModel).not.toBeNull()
    expect(bookModel.id).not.toBeNull()
    expect(bookModel.name).toEqual(bookProps.name)
    expect(bookModel.authors).toEqual(bookProps.authors)
    expect(bookModel.origin).toEqual(bookProps.origin)
    expect(bookModel.status).toEqual(bookProps.status)
    expect(bookModel.note).toEqual(bookProps.note)
    expect(bookModel.exemplary).toEqual(bookProps.exemplary)
    expect(bookModel.edition).toEqual(bookProps.edition)
    expect(bookModel.publisherId).toEqual(bookProps.publisherId)
    expect(bookModel.deletedAt).toBeNull()
    expect(bookModel.createdAt).toEqual(bookProps.createdAt)
  });
});
