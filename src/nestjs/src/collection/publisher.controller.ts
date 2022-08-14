import { Body, Controller, Delete, Get, Inject, Param, Post, Put, } from '@nestjs/common';
import { CreatePublisherInput } from './input/create-publisher.input';
import { UpdatePublisherInput } from './input/update-publisher.input';
import { CreatePublisherUseCase, UpdatePublisherUseCase } from '@geccal/core/collection/application';

@Controller('publishers')
export class PublishersController {
  @Inject(UpdatePublisherUseCase.UseCase)
  private updateUseCase: UpdatePublisherUseCase.UseCase;
  @Inject(CreatePublisherUseCase.UseCase)
  private createUseCase: CreatePublisherUseCase.UseCase;

  @Post()
  create(@Body() createPublisherDto: CreatePublisherInput) {
    return this.createUseCase.execute(createPublisherDto);
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
  update(@Param('id') id: string, @Body() updatePublisherDto: UpdatePublisherInput) {
    return this.updateUseCase.execute({
      id,
      ...updatePublisherDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'success';
  }
}
