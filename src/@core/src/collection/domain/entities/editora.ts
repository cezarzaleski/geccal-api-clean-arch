import { EntityValidationError, UniqueEntityId } from '#shared/domain';
import Entity from '#shared/domain/entity/entity';
import { EditoraValidatorFactory } from '../validators';

export type EditoraProperties = {
  nome: string,
  ativo?: boolean,
  criadoEm?: Date,
}

export class Editora extends Entity {

  private constructor(
    public nome: string,
    public ativo: boolean,
    public readonly criadoEm: Date,
    id?: UniqueEntityId) {
    super(id);
  }

  static from(props: EditoraProperties, id?: UniqueEntityId): Editora {
    let {nome, ativo, criadoEm} = props
    if (ativo === undefined) ativo = true
    props.criadoEm = props.criadoEm ?? new Date();
    Editora.validate(props);
    return new Editora(nome, ativo, criadoEm, id)
  }

  ativar() {
    this.ativo = true;
  }

  desativar() {
    this.ativo = false;
  }

  static validate(props: EditoraProperties) {
    const validator = EditoraValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  update(nome: string) {
    Editora.validate({nome});
    this.nome = nome;
  }
}
