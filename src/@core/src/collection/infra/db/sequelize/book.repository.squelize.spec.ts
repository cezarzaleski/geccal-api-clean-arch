import { Sequelize } from 'sequelize-typescript'
import { BookModel } from '#collection/infra/db/sequelize/book.model';
import { Book } from '#collection/domain';
import BookPropertiesFake from '#collection/domain/entities/__tests__/bookPropertiesFake';
import { BookRepositorySequelize } from '#collection/infra/db/sequelize/book.repository.sequelize';

describe('BookRepositorySequelize Integration', () => {
  let sequelize: Sequelize
  let subject: BookRepositorySequelize

  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      host: ':memory',
      logging: false,
      models: [BookModel]
    })
  })

  beforeEach(async () => {
    await sequelize.sync({force: true})
    subject = new BookRepositorySequelize(BookModel)
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test('should insert a new book entity', async () => {
    const bookProps = BookPropertiesFake.build()
    const book = Book.from(bookProps)
    await subject.insert(book)
    const bookModel = await BookModel.findByPk(book.id)
    expect(bookModel).not.toBeNull()
    // expect(bookModel.toJSON()).toStrictEqual(bookProps)
  });
});