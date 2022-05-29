import EditoraId from '#acervo/livro/domain/entities/editora-id.vo';
import { EntityValidationError, UniqueEntityId } from '#shared/domain';
import Origem from '#acervo/livro/domain/entities/origem.vo';
import SituacaoLivro from '#acervo/livro/domain/entities/situacao-livro.vo';
import { LivroValidatorFactory } from '#acervo/livro/domain/validators';
import Entityy from '#shared/domain/entity/entityy';
import Autor from '#acervo/livro/domain/entities/autor.vo';


export type LivroProperties = {
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

export class Livro extends Entityy {
  private constructor(
    public readonly nome: string,
    public readonly exemplar: number,
    public situacao: SituacaoLivro,
    public readonly edicao: string,
    public readonly observacao: string,
    public readonly editoraId: EditoraId,
    public readonly autores: Array<Autor>,
    public readonly origem: Origem,
    public readonly criadoEm: Date,
    id: UniqueEntityId
  ) {
    super(id);
    this.nome = nome;
    this.exemplar = exemplar;
    this.situacao = situacao;
    this.edicao = edicao;
    this.observacao = observacao;
    this.editoraId = editoraId;
    this.autores = autores;
    this.origem = origem;
    this.criadoEm = criadoEm;
  }

  static from(props: LivroProperties, id?: UniqueEntityId): Livro {
    props.criadoEm = props.criadoEm ?? new Date();
    Livro.validate(props);
    const editoraId = new EditoraId(props.editoraId)
    const autoresVo = props.autores.map(autor => new Autor(autor))
    const origem =  new Origem(props.origem)
    const situacaoLivro =  SituacaoLivro.from(props.situacao)
    const {nome, exemplar, edicao, observacao, criadoEm} = props
    return new Livro(nome, exemplar, situacaoLivro, edicao, observacao, editoraId, autoresVo, origem, criadoEm, id)
  }

  static validate(props: LivroProperties) {
    const validator = LivroValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
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
