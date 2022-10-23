import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreatePublisherInput } from './input/create-publisher.input';
import { UpdatePublisherInput } from './input/update-publisher.input';
import {
  CreatePublisherUseCase,
  DeletePublisherUseCase,
  GetPublisherUseCase,
  ListPublishersUseCase,
  UpdatePublisherUseCase
} from '@geccal/core/collection/application';
import { SearchCategoryInput } from './input/search-publisher.input';

@Controller('publishers')
export class PublishersController {


  constructor(
    private createUseCase: CreatePublisherUseCase.UseCase,
    private updateUseCase: UpdatePublisherUseCase.UseCase,
    private deleteUseCase: DeletePublisherUseCase.UseCase,
    private getUseCase: GetPublisherUseCase.UseCase,
    private listUseCase: ListPublishersUseCase.UseCase,
  ) {}

  @Post()
  create(@Body() createPublisherDto: CreatePublisherInput) {
    return this.createUseCase.execute(createPublisherDto);
  }

  @Get()
  search(@Query() searchParams: SearchCategoryInput) {
    return this.listUseCase.execute(searchParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getUseCase.execute({id: id});
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePublisherDto: UpdatePublisherInput) {
    return this.updateUseCase.execute({
      id,
      ...updatePublisherDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUseCase.execute({id: id});
  }
}
