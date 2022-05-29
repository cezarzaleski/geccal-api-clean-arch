import { Editora } from '#acervo/editora/domain';

export type EditoraOutput = {
  id: string;
  nome: string;
  ativo: boolean;
  criadoEm: Date;
};

export class EditoraOutputMapper {
  static toOutput(entity: Editora): EditoraOutput {
    return {
      id: entity.id,
      nome: entity.nome,
      ativo: entity.ativo,
      criadoEm: entity.criadoEm
    }
  }
}
