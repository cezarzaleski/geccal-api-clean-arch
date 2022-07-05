import { Sequelize } from 'sequelize-typescript'
import { Book } from '#collection/domain';
import { getBookPropertiesFake } from '#collection/domain/entities/__tests__/bookPropertiesFake';
import { BookSequelize } from '#collection/infra/db/sequelize/book.sequelize';

describe('BookRepositorySequelize Integration', () => {
  let sequelize: Sequelize
  let subject: BookSequelize.Repository

  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      host: ':memory',
      logging: false,
      models: [BookSequelize.BookModel]
    })
  })

  beforeEach(async () => {
    await sequelize.sync({force: true})
    subject = new BookSequelize.Repository(BookSequelize.BookModel)
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test('should insert a new book entity', async () => {
    const bookProps = getBookPropertiesFake()
    const book = Book.from(bookProps)
    await subject.insert(book)
    const bookModel = await BookSequelize.BookModel.findByPk(book.id)
    expect(bookModel).not.toBeNull()
  });
});
