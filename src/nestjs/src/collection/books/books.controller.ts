import {
  Controller,
  Get,
  Post,
  Body,
  Put,
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
  private updateUseCase: UpdateBookUseCase.UseCase;

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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.updateUseCase.execute({
      id,
      ...updateBookDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'success';
  }
}
