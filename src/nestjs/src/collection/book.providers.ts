/* eslint-disable @typescript-eslint/no-namespace */

import {
  CreateBookUseCase,
  UpdateBookUseCase,
} from '@geccal/core/collection/application';
import { BookRepository } from '@geccal/core/collection/domain';
import { BookSequelize } from '@geccal/core/collection/infra';

export namespace BOOK_PROVIDERS {
  export namespace REPOSITORIES {
    export const BOOK_REPOSITORY_SEQUELIZE = {
      provide: 'BookRepositorySequelize',
      useClass: BookSequelize.Repository
    };
  }

  export namespace USE_CASES {
    export const CREATE_CATEGORY_USE_CASE = {
      provide: CreateBookUseCase.UseCase,
      useFactory: (categoryRepo: BookRepository.Repository) => {
        return new CreateBookUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.BOOK_REPOSITORY_SEQUELIZE.provide],
    };

    export const UPDATE_CATEGORY_USE_CASE = {
      provide: UpdateBookUseCase.UseCase,
      useFactory: (categoryRepo: BookRepository.Repository) => {
        return new UpdateBookUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.BOOK_REPOSITORY_SEQUELIZE.provide],
    };
  }
}
