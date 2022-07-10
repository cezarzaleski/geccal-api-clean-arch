import { Sequelize } from 'sequelize-typescript'
import { Book, Publisher } from '#collection/domain';
import { getBookPropertiesFake } from '#collection/domain/entities/__tests__/bookPropertiesFake';
import { BookSequelize } from '#collection/infra/db/sequelize/book.sequelize';
import { PublisherSequelize } from '#collection/infra';

describe('BookRepositorySequelize Integration', () => {
  let sequelize: Sequelize
  let subject: BookSequelize.Repository
  const publisherProps = getBookPropertiesFake()
  const publisher = Publisher.from(publisherProps)

  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      host: ':memory',
      logging: false,
      models: [BookSequelize.BookModel, PublisherSequelize.PublisherModel]
    })
  })

  beforeEach(async () => {
    await sequelize.sync({force: true})
    subject = new BookSequelize.Repository(BookSequelize.BookModel)
    PublisherSequelize.PublisherModel.create(PublisherSequelize.PublisherModelMapper.toModel(publisher))
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test('should insert a new book entity', async () => {
    const bookProps = getBookPropertiesFake({publisherId: publisher.id})
    const book = Book.from(bookProps)
    await subject.insert(book)
    const bookModel = await BookSequelize.BookModel.findByPk(book.id)
    expect(bookModel).not.toBeNull()
  });
});
