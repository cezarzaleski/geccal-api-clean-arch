import { LivroProperties } from '#acervo/livro/domain';
import EditoraId from '#acervo/livro/domain/entities/editora-id.vo';


export default class LivroPropertiesFake {
  static build({
                 autores = ['maria', 'pedro'],
                 criadoEm = new Date(),
                 origem = 'donation',
                 situacao = 'disponivel',
                 editoraId = new EditoraId().value
               }:
                 { autores?: string[]; criadoEm?: Date, origem?: string, situacao?: string, editoraId?: string } = {}
  ): LivroProperties {
    return {
      autores: autores,
      criadoEm: criadoEm,
      edicao: '1ª',
      exemplar: 1,
      origem: origem,
      editoraId: editoraId,
      nome: 'livro',
      situacao: situacao,
      observacao: 'some description'
    }
  }
}
