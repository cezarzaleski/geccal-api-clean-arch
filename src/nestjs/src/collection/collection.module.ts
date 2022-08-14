import { Module } from '@nestjs/common';
import { BooksController } from 'src/collection/books.controller';
import { BOOK_PROVIDERS } from 'src/collection/book.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookSequelize } from '@geccal/core/collection/infra';
import { PUBLISHER_PROVIDERS } from 'src/collection/publisher.providers';
import { PublisherSequelize } from '@geccal/core/collection/infra';
import { PublishersController } from 'src/collection/publisher.controller';

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
