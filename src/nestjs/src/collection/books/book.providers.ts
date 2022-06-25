/* eslint-disable @typescript-eslint/no-namespace */

import {
  CreateBookUseCase,
  UpdateBookUseCase,
} from '@geccal/core/dist/collection/application';
import { BookRepositorySequelize } from '@geccal/core/collection/infra';
import { BookRepository } from '@geccal/core/collection/domain';

export namespace BOOK_PROVIDERS {
  export namespace REPOSITORIES {
    export const BOOK_REPOSITORY_SEQUELIZE = {
      provide: 'BookRepositorySequelize',
      useClass: BookRepositorySequelize,
    };
  }

  export namespace USE_CASES {
    export const CREATE_BOOK_USE_CASE = {
      provide: CreateBookUseCase.UseCase,
      useFactory: (bookRepo: BookRepository.Repository) => {
        return new CreateBookUseCase.UseCase(bookRepo);
      },
      inject: [REPOSITORIES.BOOK_REPOSITORY_SEQUELIZE.provide],
    };

    export const UPDATE_BOOK_USE_CASE = {
      provide: UpdateBookUseCase.UseCase,
      useFactory: (bookRepo: BookRepository.Repository) => {
        return new UpdateBookUseCase.UseCase(bookRepo);
      },
      inject: [REPOSITORIES.BOOK_REPOSITORY_SEQUELIZE.provide],
    };
  }
}
