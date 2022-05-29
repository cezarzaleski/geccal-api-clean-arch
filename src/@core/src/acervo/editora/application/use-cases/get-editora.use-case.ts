import { default as DefaultUseCase } from '#shared/application/use-case';
import { EditoraRepository } from '#acervo/editora/domain/repository';
import { EditoraOutput, EditoraOutputMapper } from '#acervo/editora/application/dto/editora-output';

export namespace GetEditoraUseCase{
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private editoraRepository: EditoraRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.editoraRepository.findById(input.id);
      return EditoraOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: string;
  };
  export type Output = EditoraOutput;
}

export default GetEditoraUseCase;
