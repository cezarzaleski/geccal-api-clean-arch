import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import { AutorValidatorFactory } from '#acervo/autor/domain';

export type AutorProperties = {
  nome: string,
  ativo?: boolean,
  criadoEm?: Date,
}

export class Autor extends Entity<AutorProperties>{
  constructor(props: AutorProperties, id?: UniqueEntityId) {
    super(props, id);
    Autor.validate(props);
    this.props.ativo = this.props.ativo ?? true;
    this.props.criadoEm = this.props.criadoEm ?? new Date();
  }

  ativar() {
    this.props.ativo = true;
  }

  desativar() {
    this.props.ativo = false;
  }

  static validate(props: AutorProperties) {
    const validator = AutorValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
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

  update(nome: string) {
    Autor.validate({nome});
    this.nome = nome;
  }
}
