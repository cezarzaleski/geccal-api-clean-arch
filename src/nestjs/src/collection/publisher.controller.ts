import { Body, Controller, Delete, Get, Inject, Param, Post, Put, } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { CreatePublisherUseCase, UpdatePublisherUseCase } from '@geccal/core/collection/application';

@Controller('publishers')
export class PublishersController {
  @Inject(UpdatePublisherUseCase.UseCase)
  private updateUseCase: UpdatePublisherUseCase.UseCase;
  @Inject(CreatePublisherUseCase.UseCase)
  private createUseCase: CreatePublisherUseCase.UseCase;

  @Post()
  create(@Body() createPublisherDto: CreatePublisherDto) {
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
  update(@Param('id') id: string, @Body() updatePublisherDto: UpdatePublisherDto) {
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
