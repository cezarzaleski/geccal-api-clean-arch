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

export default class SituacaoLivro extends ValueObject<string> {
  static EMPRESTADO = new SituacaoLivro(SituacaoEnum.EMPRESTADO)
  static DISPONIVEL = new SituacaoLivro(SituacaoEnum.DISPONIVEL)
  static PERDIDO = new SituacaoLivro(SituacaoEnum.PERDIDO)
  static INAPROPRIADO = new SituacaoLivro(SituacaoEnum.INAPROPRIADO)
  static EXTRAVIADO = new SituacaoLivro(SituacaoEnum.EXTRAVIADO)
  static DOADO = new SituacaoLivro(SituacaoEnum.DOADO)

  static from (value: string) {
    SituacaoLivro.validate(value)
    return new SituacaoLivro(value)
  }

  static validate(value) {
    const situacaoInvalida = !Object.values(SituacaoEnum).includes(value)
    if (situacaoInvalida) throw new InvalidSituacaoLivroError();
  }
}
