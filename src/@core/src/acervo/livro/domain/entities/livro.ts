import EditoraId from '#acervo/livro/domain/entities/editora-id.vo';
import { Entity, UniqueEntityId } from '#shared/domain';
import AutorId from '#acervo/livro/domain/entities/autor-id.vo';


export type LivroProperties = {
  nome: string,
  exemplar: number,
  ativo?: boolean,
  edicao: string,
  observacao?: string,
  editora: EditoraId,
  autor: AutorId,
  origem: string,
  criadoEm?: Date,
}

export class Livro extends Entity<LivroProperties>{
  constructor(props: LivroProperties, id?: UniqueEntityId) {
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

  get exemplar() {
    return this.props.exemplar
  }

  private set exemplar(value) {
    this.props.exemplar = value
  }

  get ativo() {
    return this.props.ativo
  }

  private set ativo(value: boolean) {
    this.props.ativo = value ?? true;
  }

  get edicao() {
    return this.props.edicao
  }

  private set edicao(value) {
    this.props.edicao = value
  }

  get observacao() {
    return this.props.observacao
  }

  private set observacao(value) {
    this.props.observacao = value
  }

  get editora() {
    return this.props.editora
  }

  private set editora(value) {
    this.props.editora = value
  }

  get autor() {
    return this.props.autor
  }

  private set autor(value) {
    this.props.autor = value
  }

  get origem() {
    return this.props.origem
  }

  private set origem(value) {
    this.props.origem = value
  }

  get criadoEm() {
    return this.props.criadoEm
  }

  private set criadoEm(value) {
    this.props.criadoEm = value
  }
}
