import { BookProperties } from '#collection/domain';
import { EditoraId } from '#collection/domain/entities/value-objects';


export default class BookPropertiesFake {
  static build({
                 autores = ['maria', 'pedro'],
                 criadoEm = new Date(),
                 origem = 'donation',
                 situacao = 'disponivel',
                 nome = 'livro',
                 observacao = 'some description',
                 exemplar = 1,
                 edicao = '1ª',
                 editoraId = new EditoraId().value
               }: {
                 autores?: string[];
                 criadoEm?: Date,
                 origem?: string,
                 exemplar?: number,
                 situacao?: string,
                 nome?: string,
                 edicao?: string,
                 observacao?: string,
                 editoraId?: string
               } = {}
  ): BookProperties {
    return {
      autores: autores,
      criadoEm: criadoEm,
      edicao: edicao,
      exemplar: exemplar,
      origem: origem,
      editoraId: editoraId,
      nome: nome,
      situacao: situacao,
      observacao: observacao
    }
  }
}
