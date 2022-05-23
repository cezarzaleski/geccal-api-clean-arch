import SituacaoLivro from '#acervo/livro/domain/entities/situacao-livro.vo';
import InvalidSituacaoLivroError from '#acervo/livro/domain/erros/invalid-situacao-livro.error';


describe('Situacao Livro Unit Tests', function () {
  test('given situação when invalid then throw InvalidSituacaoLivroError', () => {
    expect(() =>
      SituacaoLivro.from('invalid')
    ).toThrow(new InvalidSituacaoLivroError(`Situação do livro inválida`));
  })
  test('given situação when valid then retun SituacaoLivro', () => {
    const situacaoLivroExpected = 'disponivel'

    const subject = SituacaoLivro.from(situacaoLivroExpected)

    expect(subject.value).toBe(situacaoLivroExpected);
  })
});
