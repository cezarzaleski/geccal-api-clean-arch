import { Sequelize } from 'sequelize-typescript'
import { getBookPropertiesFake } from '#collection/domain/entities/__tests__/bookPropertiesFake';
import { PublisherSequelize } from '#collection/infra';
import { Publisher } from '#collection/domain';

describe('PublisherSequelize Integration', () => {
  let sequelize: Sequelize
  let subject: PublisherSequelize.Repository

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
    subject = new PublisherSequelize.Repository(PublisherSequelize.PublisherModel)
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test('should insert a new publisher entity', async () => {
    const publisherProps = getBookPropertiesFake()
    const publisher = Publisher.from(publisherProps)
    await subject.insert(publisher)
    const publisherModel = await PublisherSequelize.PublisherModel.findByPk(publisher.id)
    expect(publisherModel).not.toBeNull()
  });
});
