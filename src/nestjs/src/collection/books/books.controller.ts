import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return 'success';
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
