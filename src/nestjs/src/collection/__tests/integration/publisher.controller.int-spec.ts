import { PublishersController } from '../../publisher.controller';
import { TestingModule, Test } from '@nestjs/testing'
import { ConfigModule } from '../../../config/config.module';
import { DatabaseModule } from '../../../database/database.module';
import { CollectionModule } from '../../collection.module';


describe('PublisherController Integration Tests', function () {
  let controller: PublishersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, CollectionModule]
    }).compile()
    controller = module.get(PublishersController)
  })

  it('should ', function () {
    console.log('deu bom')
  });
});
