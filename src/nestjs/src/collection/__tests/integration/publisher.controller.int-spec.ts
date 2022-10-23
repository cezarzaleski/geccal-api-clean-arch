import { PublishersController } from '../../publisher.controller';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '../../../config/config.module';
import { DatabaseModule } from '../../../database/database.module';
import { CollectionModule } from '../../collection.module';
import { CreatePublisherUseCase, UpdatePublisherUseCase, GetPublisherUseCase, ListPublishersUseCase, DeletePublisherUseCase } from '@geccal/core/collection/application';


describe('PublisherController Integration Tests', function () {
  let controller: PublishersController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), CollectionModule, DatabaseModule],
    }).compile()
    controller = await module.get<PublishersController>(PublishersController)
  });

  test('should be defined', function () {
    expect(controller).toBeDefined()
    expect(controller['createUseCase']).toBeInstanceOf(
      CreatePublisherUseCase.UseCase
    )
    expect(controller['updateUseCase']).toBeInstanceOf(
      UpdatePublisherUseCase.UseCase
    )
    expect(controller['getUseCase']).toBeInstanceOf(
      GetPublisherUseCase.UseCase
    )
    expect(controller['listUseCase']).toBeInstanceOf(
      ListPublishersUseCase.UseCase
    )
    expect(controller['deleteUseCase']).toBeInstanceOf(
      DeletePublisherUseCase.UseCase
    )
  });

  test('should create a publisher', async function () {
    const nameExpected = 'teste'
    const output: any = await controller.create({
      name: nameExpected
    })
    expect(output.name).toBe(nameExpected)
    expect(output.active).toBeTruthy()
    expect(output.createdAt).toBeDefined()
  });
});
