import { default as DefaultUseCase } from '#shared/application/use-case';
import { EditoraOutput, EditoraOutputMapper } from '#collection/application/dto/editora-output';
import { EditoraRepository } from '#collection/domain';

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
