/* eslint-disable @typescript-eslint/no-namespace */
import {
  CreatePublisherUseCase,
  UpdatePublisherUseCase,
  GetPublisherUseCase,
  ListPublishersUseCase,
  DeletePublisherUseCase
} from '@geccal/core/collection/application';
import { PublisherRepository } from '@geccal/core/collection/domain';
import { PublisherSequelize } from '@geccal/core/collection/infra';
import { getModelToken } from '@nestjs/sequelize';
export namespace PUBLISHER_PROVIDERS {
  export namespace REPOSITORIES {
    export const PUBLISHER_SEQUELIZE_REPOSITORY = {
      provide: 'PublisherSequelizeRepository',
      useFactory: (publisherModel: typeof PublisherSequelize.PublisherModel) => {
        return new PublisherSequelize.Repository(publisherModel);
      },
      inject: [getModelToken(PublisherSequelize.PublisherModel)],
    };

    export const PUBLISHER_REPOSITORY = {
      provide: 'PublisherRepository',
      useExisting: 'PublisherSequelizeRepository',
    };
  }

  export namespace USE_CASES {
    export const CREATE_PUBLISHER_USE_CASE = {
      provide: CreatePublisherUseCase.UseCase,
      useFactory: (publisherRepo: PublisherRepository.Repository) => {
        return new CreatePublisherUseCase.UseCase(publisherRepo);
      },
      inject: [REPOSITORIES.PUBLISHER_REPOSITORY.provide],
    };

    export const UPDATE_PUBLISHER_USE_CASE = {
      provide: UpdatePublisherUseCase.UseCase,
      useFactory: (publisherRepo: PublisherRepository.Repository) => {
        return new UpdatePublisherUseCase.UseCase(publisherRepo);
      },
      inject: [REPOSITORIES.PUBLISHER_REPOSITORY.provide],
    };

    export const LIST_PUBLISHERS_USE_CASE = {
      provide: ListPublishersUseCase.UseCase,
      useFactory: (publisherRepo: PublisherRepository.Repository) => {
        return new ListPublishersUseCase.UseCase(publisherRepo);
      },
      inject: [REPOSITORIES.PUBLISHER_REPOSITORY.provide],
    };

    export const GET_PUBLISHER_USE_CASE = {
      provide: GetPublisherUseCase.UseCase,
      useFactory: (publisherRepo: PublisherRepository.Repository) => {
        return new GetPublisherUseCase.UseCase(publisherRepo);
      },
      inject: [REPOSITORIES.PUBLISHER_REPOSITORY.provide],
    };

    export const DELETE_PUBLISHER_USE_CASE = {
      provide: DeletePublisherUseCase.UseCase,
      useFactory: (publisherRepo: PublisherRepository.Repository) => {
        return new DeletePublisherUseCase.UseCase(publisherRepo);
      },
      inject: [REPOSITORIES.PUBLISHER_REPOSITORY.provide],
    };
  }
}
