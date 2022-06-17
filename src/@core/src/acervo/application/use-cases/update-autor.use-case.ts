import { default as DefaultUseCase } from '#shared/application/use-case';
import AutorRepository from '#acervo/domain/repository/autor.repository';
import { AutorOutput, AutorOutputMapper } from '#acervo/application/dto/autor-output';

export namespace UpdateAutorUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private autorRepository: AutorRepository.Repository) {
    }

    async execute(input: Input): Promise<Output> {
      const autor = await this.autorRepository.findById(input.id);
      autor.update(input.nome);
      if (input.ativo === true) autor.ativar();
      if (input.ativo === false) autor.desativar();
      await this.autorRepository.update(autor);
      return AutorOutputMapper.toOutput(autor);
    }
  }

  export type Input = {
    id: string;
    nome: string;
    ativo?: boolean;
  };

  export type Output = AutorOutput;

}
export default UpdateAutorUseCase;