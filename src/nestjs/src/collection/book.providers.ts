/* eslint-disable @typescript-eslint/no-namespace */

import {
  CreateBookUseCase,
  UpdateBookUseCase,
} from '@geccal/core/collection/application';
import { BookRepository } from '@geccal/core/collection/domain';
import { BookSequelize } from '@geccal/core/collection/infra';
import { getModelToken } from '@nestjs/sequelize';

export namespace BOOK_PROVIDERS {
  export namespace REPOSITORIES {
    export const BOOK_REPOSITORY_SEQUELIZE = {
      provide: 'BookRepositorySequelize',
      useFactory: (bookModel: typeof BookSequelize.BookModel) => {
        return new BookSequelize.Repository(bookModel);
      },
      inject: [getModelToken(BookSequelize.BookModel)],
    };

    export const BOOK_REPOSITORY = {
      provide: 'BookRepository',
      useExisting: 'BookRepositorySequelize',
    };
  }

  export namespace USE_CASES {
    export const CREATE_BOOK_USE_CASE = {
      provide: CreateBookUseCase.UseCase,
      useFactory: (categoryRepo: BookRepository.Repository) => {
        return new CreateBookUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.BOOK_REPOSITORY.provide],
    };


    export const UPDATE_BOOK_USE_CASE = {
      provide: UpdateBookUseCase.UseCase,
      useFactory: (categoryRepo: BookRepository.Repository) => {
        return new UpdateBookUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.BOOK_REPOSITORY.provide],
    };
  }
}
