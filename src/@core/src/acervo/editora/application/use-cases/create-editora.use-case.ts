import { default as DefaultUseCase } from '#shared/application/use-case';
import { EditoraRepository } from '#acervo/editora/domain/repository';
import { Editora } from '#acervo/editora/domain';
import { EditoraOutput, EditoraOutputMapper } from '#acervo/editora/application/dto/editora-output';

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
