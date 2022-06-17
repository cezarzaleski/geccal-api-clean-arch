import { default as DefaultUseCase } from '#shared/application/use-case';
import AutorRepository from '#acervo/domain/repository/autor.repository';
import { AutorOutput, AutorOutputMapper } from '#acervo/application/dto/autor-output';

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