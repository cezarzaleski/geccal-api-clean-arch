/* eslint-disable @typescript-eslint/no-namespace */

import {
  CreatePublisherUseCase,
  UpdatePublisherUseCase,
} from '@geccal/core/collection/application';

import { getModelToken } from '@nestjs/sequelize';
import { PublisherSequelize } from '@geccal/core/collection/infra';
import { PublisherRepository } from '@geccal/core/collection/domain';

export namespace PUBLISHER_PROVIDERS {
  export namespace REPOSITORIES {
    export const PUBLISHER_REPOSITORY_SEQUELIZE = {
      provide: 'PublisherRepositorySequelize',
      useFactory: (publisherModel: typeof PublisherSequelize.PublisherModel) => {
        return new PublisherSequelize.Repository(publisherModel);
      },
      inject: [getModelToken(PublisherSequelize.PublisherModel)],
    };

    export const BOOK_REPOSITORY = {
      provide: 'PublisherRepository',
      useExisting: 'PublisherRepositorySequelize',
    };
  }

  export namespace USE_CASES {
    export const CREATE_PUBLISHER_USE_CASE = {
      provide: CreatePublisherUseCase.UseCase,
      useFactory: (publisherRepo: PublisherRepository.Repository) => {
        return new CreatePublisherUseCase.UseCase(publisherRepo);
      },
      inject: [REPOSITORIES.BOOK_REPOSITORY.provide],
    };


    export const UPDATE_PUBLISHER_USE_CASE = {
      provide: UpdatePublisherUseCase.UseCase,
      useFactory: (publisherRepo: PublisherRepository.Repository) => {
        return new UpdatePublisherUseCase.UseCase(publisherRepo);
      },
      inject: [REPOSITORIES.BOOK_REPOSITORY.provide],
    };
  }
}