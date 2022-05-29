import { default as DefaultUseCase } from '#shared/application/use-case';
import { EditoraRepository } from '#acervo/editora/domain/repository';
import { EditoraOutput, EditoraOutputMapper } from '#acervo/editora/application/dto/editora-output';

export namespace UpdateEditoraUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private editoraRepository: EditoraRepository.Repository
    ) {}

    async execute(input: Input): Promise<Output> {
      const editora = await this.editoraRepository.findById(input.id);
      editora.update(input.nome);
      if (input.ativo === true) editora.ativar();
      if (input.ativo === false) editora.desativar();
      await this.editoraRepository.update(editora);
      return EditoraOutputMapper.toOutput(editora);
    }
  }

  export type Input = {
    id: string;
    nome: string;
    ativo?: boolean;
  };

  export type Output = EditoraOutput;

}
export default UpdateEditoraUseCase;
