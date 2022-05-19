import { default as DefaultUseCase } from '#shared/application/use-case';
import { AutorRepository } from '../../domain/repository';
import {Autor} from "../../domain";
import {AutorOutput, AutorOutputMapper} from "../dto";

export namespace CreateAutorUseCase{
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private autorRepository: AutorRepository.Repository) {}
  
    async execute(input: Input): Promise<Output> {
      const entity = new Autor(input);
      await this.autorRepository.insert(entity);
      return AutorOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    nome: string;
    ativo?: boolean;
  };
  
  export type Output = AutorOutput;
  
}
export default CreateAutorUseCase;