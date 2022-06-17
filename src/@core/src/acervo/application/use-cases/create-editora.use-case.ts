import { default as DefaultUseCase } from '#shared/application/use-case';
import { EditoraOutput, EditoraOutputMapper } from '#acervo/application/dto/editora-output';
import { Editora, EditoraRepository } from '#acervo/domain';

export namespace CreateEditoraUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private editoraRepository: EditoraRepository.Repository) {
    }

    async execute(input: Input): Promise<Output> {
      const entity = Editora.from(input);
      await this.editoraRepository.insert(entity);
      return EditoraOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    nome: string;
    ativo?: boolean;
  };

  export type Output = EditoraOutput;

}
export default CreateEditoraUseCase;
