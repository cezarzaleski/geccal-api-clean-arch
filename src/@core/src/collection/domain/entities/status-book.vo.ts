import { ValueObject } from '#shared/domain';
import InvalidSituacaoLivroError from '#collection/domain/erros/invalid-situacao-livro.error';


enum SituacaoEnum {
  DISPONIVEL = 'disponivel',
  EMPRESTADO = 'emprestado',
  PERDIDO = 'perdido',
  INAPROPRIADO = 'inapropriado',
  EXTRAVIADO = 'extraviado',
  DOADO = 'doado',
}

export default class StatusBook extends ValueObject<string> {
  static EMPRESTADO = new StatusBook(SituacaoEnum.EMPRESTADO)
  static DISPONIVEL = new StatusBook(SituacaoEnum.DISPONIVEL)
  static PERDIDO = new StatusBook(SituacaoEnum.PERDIDO)
  static INAPROPRIADO = new StatusBook(SituacaoEnum.INAPROPRIADO)
  static EXTRAVIADO = new StatusBook(SituacaoEnum.EXTRAVIADO)
  static DOADO = new StatusBook(SituacaoEnum.DOADO)

  static from (value: string) {
    StatusBook.validate(value)
    return new StatusBook(value)
  }

  static validate(value) {
    const situacaoInvalida = !Object.values(SituacaoEnum).includes(value)
    if (situacaoInvalida) throw new InvalidSituacaoLivroError();
  }
}
