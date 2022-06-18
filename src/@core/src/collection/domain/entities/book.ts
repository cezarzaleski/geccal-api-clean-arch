import { EntityValidationError, UniqueEntityId } from '#shared/domain';
import SituacaoLivro from '#collection/domain/entities/situacao-livro.vo';
import { BookValidatorFactory } from '#collection/domain/validators';
import Entity from '#shared/domain/entity/entity';
import { Autor, EditoraId, Origem } from '#collection/domain/entities/value-objects';


export type BookProperties = {
  nome: string,
  exemplar: number,
  situacao: string,
  edicao: string,
  observacao?: string,
  editoraId: string,
  autores: Array<string>,
  origem: string,
  criadoEm?: Date,
}

type BookPropertiesUpdate = Omit<BookProperties, 'criadoEm' | 'situacao'>

export class Book extends Entity {
  private constructor(
    public nome: string,
    public exemplar: number,
    public situacao: SituacaoLivro,
    public edicao: string,
    public observacao: string,
    public editoraId: EditoraId,
    public autores: Array<Autor>,
    public origem: Origem,
    public readonly criadoEm: Date,
    id: UniqueEntityId
  ) {
    super(id);
  }

  static from(props: BookProperties, id?: UniqueEntityId): Book {
    props.criadoEm = props.criadoEm ?? new Date();
    Book.validate(props);
    const editoraId = new EditoraId(props.editoraId)
    const autoresVo = props.autores.map(autor => new Autor(autor))
    const origem =  new Origem(props.origem)
    const situacaoLivro =  SituacaoLivro.from(props.situacao)
    const {nome, exemplar, edicao, observacao, criadoEm} = props
    return new Book(nome, exemplar, situacaoLivro, edicao, observacao, editoraId, autoresVo, origem, criadoEm, id)
  }

  static validate(props: BookProperties) {
    const validator = BookValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  update(
    props: BookPropertiesUpdate
  ) {

    Book.validate({...props, situacao: this.situacao.value});
    const {nome, exemplar, edicao, observacao, editoraId, autores, origem} = props
    const editoraIdVo = new EditoraId(editoraId)
    const autoresVo = autores.map(autor => new Autor(autor))
    const origemVo =  new Origem(origem)
    this.nome = nome
    this.exemplar = exemplar
    this.edicao = edicao
    this.observacao = observacao
    this.editoraId = editoraIdVo
    this.autores = autoresVo
    this.origem = origemVo
  }

  perder() {
    this.situacao = SituacaoLivro.PERDIDO;
  }

  inapropriar() {
    this.situacao = SituacaoLivro.INAPROPRIADO;
  }

  doar() {
    this.situacao = SituacaoLivro.DOADO;
  }

  extraviar() {
    this.situacao = SituacaoLivro.EXTRAVIADO;
  }
}
