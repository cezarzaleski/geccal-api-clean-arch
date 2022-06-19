import { Module } from '@nestjs/common';
import { BooksController } from 'src/collection/books/books.controller';
import { BooksModule } from 'src/collection/books/books.module';

@Module({
  controllers: [BooksController],
  imports: [BooksModule],
})
export class CollectionModule {}
