import { Sequelize } from 'sequelize-typescript'
import { BookSequelize } from '#collection/infra/db/sequelize/book.sequelize';

describe('BookModel Unit Test', () => {
  let sequelize: Sequelize

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
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test('should create new BookModel', async () => {
    const bookExpected = {
      id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      createdAt: new Date(),
      authors: ['Maria', 'Pedro'],
      edition: '1ª',
      name: 'A new Book',
      status: 'disponivel',
      publisherId: '9366b7dc-2d71-4799-b91c-c64adb205104',
      origin: 'doado'
    }
    const subject = await BookSequelize.BookModel.create(bookExpected)
    expect(subject.toJSON()).toStrictEqual(bookExpected)
  });
});
