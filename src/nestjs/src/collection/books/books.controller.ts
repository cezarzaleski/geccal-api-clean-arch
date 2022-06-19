import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookUseCase } from '@geccal/core/collection/application';
import { UpdateBookUseCase } from '@geccal/core/collection/application';

@Controller('books')
export class BooksController {
  @Inject(CreateBookUseCase.UseCase)
  private createUseCase: CreateBookUseCase.UseCase;

  @Inject(UpdateBookUseCase.UseCase)
  private updateBookUseCase: UpdateBookUseCase.UseCase;

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.createUseCase.execute(createBookDto);
  }

  @Get()
  findAll() {
    return 'success';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'success';
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return 'success';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'success';
  }
}
