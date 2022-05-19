import { Autor } from '../../domain/entities/autor';

export type AutorOutput = {
  id: string;
  nome: string;
  ativo: boolean;
  criadoEm: Date;
};

export class AutorOutputMapper {
  static toOutput(entity: Autor): AutorOutput {
    return entity.toJSON();
  }
}
