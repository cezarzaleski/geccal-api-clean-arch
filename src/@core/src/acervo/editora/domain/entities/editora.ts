import { Entity, UniqueEntityId } from '#shared/domain';

export type EditoraProperties = {
  nome: string,
  ativo?: boolean,
  criadoEm?: Date,
}

export class Editora extends Entity<EditoraProperties> {
  constructor(props: EditoraProperties, id?: UniqueEntityId) {
    super(props, id);
  }

  ativar() {
    this.props.ativo = true;
  }

  desativar() {
    this.props.ativo = false;
  }

  get nome() {
    return this.props.nome
  }

  private set nome(value) {
    this.props.nome = value
  }

  get ativo() {
    return this.props.ativo
  }

  private set ativo(value: boolean) {
    this.props.ativo = value ?? true;
  }

  get criadoEm() {
    return this.props.criadoEm
  }

  private set criadoEm(value) {
    this.props.criadoEm = value
  }
}
