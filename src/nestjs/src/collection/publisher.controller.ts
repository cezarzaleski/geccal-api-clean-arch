import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { CreatePublisherInput } from './input/create-publisher.input';
import { UpdatePublisherInput } from './input/update-publisher.input';
import { CreatePublisherUseCase, UpdatePublisherUseCase, GetPublisherUseCase, ListPublishersUseCase, DeletePublisherUseCase   } from '@geccal/core/collection/application';
import { SearchCategoryInput } from './input/search-publisher.input';

@Controller('publishers')
export class PublishersController {
  @Inject(UpdatePublisherUseCase.UseCase)
  private updateUseCase: UpdatePublisherUseCase.UseCase;
  @Inject(CreatePublisherUseCase.UseCase)
  private createUseCase: CreatePublisherUseCase.UseCase;
  @Inject(GetPublisherUseCase.UseCase)
  private getUseCase: GetPublisherUseCase.UseCase;
  @Inject(ListPublishersUseCase.UseCase)
  private listUseCase: ListPublishersUseCase.UseCase;
  @Inject(DeletePublisherUseCase.UseCase)
  private deleteUseCase: DeletePublisherUseCase.UseCase;

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
