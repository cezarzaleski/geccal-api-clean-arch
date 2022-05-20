import { default as DefaultUseCase } from '#shared/application/use-case';
import { Autor, AutorRepository } from '#acervo/autor/domain';
import { AutorOutput, AutorOutputMapper } from '#acervo/autor/application';

export namespace CreateAutorUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private autorRepository: AutorRepository.Repository) {
    }

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