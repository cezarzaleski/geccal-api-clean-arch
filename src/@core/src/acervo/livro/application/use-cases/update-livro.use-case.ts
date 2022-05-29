import { default as DefaultUseCase } from '#shared/application/use-case';
import { LivroRepository } from '#acervo/livro/domain';
import { LivroOutput, LivroOutputMapper } from '#acervo/livro/application';

export namespace UpdateLivroUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private livroRepository: LivroRepository.Repository
    ) {}

    async execute(input: Input): Promise<Output> {
      const livro = await this.livroRepository.findById(input.id);
      livro.update({...input});
      await this.livroRepository.update(livro);
      return LivroOutputMapper.toOutput(livro);
    }
  }

  export type Input = {
    id: string;
    nome: string
    exemplar: number
    situacao: string
    edicao: string
    observacao: string
    editoraId: string
    autores: Array<string>
    origem: string
    criadoEm: Date
  };

  export type Output = LivroOutput;

}
export default UpdateLivroUseCase;
