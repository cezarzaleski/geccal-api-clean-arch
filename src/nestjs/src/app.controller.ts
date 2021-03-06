import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Book, PublisherId } from '@geccal/core/collection/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const createdAt = new Date();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const publisherId = new PublisherId()?.value;
    const authors = ['maria', 'pedro'];
    const origin = 'donation';
    const status = 'disponivel';
    const propsBook = {
      authors: authors,
      createdAt: createdAt,
      edition: '1ª',
      exemplary: 1,
      origin: origin,
      publisherId: publisherId,
      name: 'livro',
      status: status,
      note: 'some description',
    };

    const book = Book.from(propsBook);
    console.log(book.name);

    return this.appService.getHello();
  }
}
