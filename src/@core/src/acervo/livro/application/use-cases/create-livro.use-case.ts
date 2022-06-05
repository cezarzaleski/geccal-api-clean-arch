import { default as DefaultUseCase } from '#shared/application/use-case';
import { LivroRepository } from '#acervo/livro/domain/repository';
import { Livro } from '#acervo/livro/domain';
import { LivroOutput, LivroOutputMapper } from '#acervo/livro/application/dto/livro-output';

export namespace CreateLivroUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private livroRepository: LivroRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = Livro.from(input);
      await this.livroRepository.insert(entity);
      return LivroOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
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
