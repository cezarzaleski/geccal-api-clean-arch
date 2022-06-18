import { Book } from '#collection/domain';


export type BookOutput = {
  id: string
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

export class BookOutputMapper {
  static toOutput(entity: Book): BookOutput {
    return {
      id: entity.id,
      nome: entity.nome,
      exemplar: entity.exemplar,
      observacao: entity.observacao,
      editoraId: entity.editoraId.value,
      origem: entity.origem.value,
      autores: entity.autores.map(autor => autor.value),
      edicao: entity.edicao,
      situacao: entity.situacao.value,
      criadoEm: entity.criadoEm
    }
  }
}
