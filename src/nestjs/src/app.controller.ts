import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Book } from '@geccal/core/book/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const props = {
      author: 'some author',
      createdAt: new Date(),
      edition: '1ª',
      exemplary: 1,
      isActive: true,
      origin: 'donation',
      publishingCompany: 'some publishing Company',
      name: 'book',
      description: 'some description',
    };
    const book = new Book(props);

    return this.appService.getHello();
  }
}
