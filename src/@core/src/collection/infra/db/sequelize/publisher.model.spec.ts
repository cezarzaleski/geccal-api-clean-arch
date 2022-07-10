import { Sequelize } from 'sequelize-typescript'
import { PublisherSequelize } from '#collection/infra/db/sequelize/publisher.sequelize';

describe('PublisherModel Unit Test', () => {
  let sequelize: Sequelize

  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      host: ':memory',
      logging: false,
      models: [PublisherSequelize.PublisherModel]
    })
  })

  beforeEach(async () => {
    await sequelize.sync({force: true})
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test('should create new PublisherModel', async () => {
    const bookExpected = {
      id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      name: 'publisherFake',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const subject = await PublisherSequelize.PublisherModel.create(bookExpected)
    expect(subject.toJSON()).toStrictEqual(bookExpected)
  });
});
