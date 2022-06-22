import { Module } from '@nestjs/common';
import { BooksController } from 'src/collection/books.controller';
import { BOOK_PROVIDERS } from 'src/collection/book.providers';

@Module({
  controllers: [BooksController],
  providers: [
    ...Object.values(BOOK_PROVIDERS.REPOSITORIES),
    ...Object.values(BOOK_PROVIDERS.USE_CASES),
  ],
})
export class CollectionModule {}
