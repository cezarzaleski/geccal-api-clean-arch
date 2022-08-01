import { BookSequelize } from '#collection/infra/db/sequelize/book.sequelize';
import { setupSequelize } from '#shared/infra';

describe('BookModel Unit Test', () => {
  setupSequelize({models: [BookSequelize.BookModel]})

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
