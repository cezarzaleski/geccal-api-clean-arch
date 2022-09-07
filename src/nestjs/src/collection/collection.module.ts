import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookSequelize } from '@geccal/core/collection/infra';
import { PublisherSequelize } from '@geccal/core/collection/infra';
import { BooksController } from './books.controller';
import { PublishersController } from './publisher.controller';
import { BOOK_PROVIDERS } from './book.providers';
import { PUBLISHER_PROVIDERS } from './publisher.providers';

@Module({
  imports: [SequelizeModule.forFeature([BookSequelize.BookModel, PublisherSequelize.PublisherModel])],
  controllers: [BooksController, PublishersController],
  providers: [
    ...Object.values(BOOK_PROVIDERS.REPOSITORIES),
    ...Object.values(BOOK_PROVIDERS.USE_CASES),
    ...Object.values(PUBLISHER_PROVIDERS.REPOSITORIES),
    ...Object.values(PUBLISHER_PROVIDERS.USE_CASES),
  ],
})
export class CollectionModule {}
