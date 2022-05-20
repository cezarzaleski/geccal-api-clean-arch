import { AutorRepository } from '../../domain/repository';
import { AutorOutput, AutorOutputMapper } from '../dto';
import { default as DefaultUseCase } from '../../../../@shared/application/use-case';

export namespace GetAutorUseCase{
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private categoryRepo: AutorRepository.Repository) {}
  
    async execute(input: Input): Promise<Output> {
      const entity = await this.categoryRepo.findById(input.id);
      return AutorOutputMapper.toOutput(entity);
    }
  }
  
  export type Input = {
    id: string;
  };
  export type Output = AutorOutput;
}

export default GetAutorUseCase;