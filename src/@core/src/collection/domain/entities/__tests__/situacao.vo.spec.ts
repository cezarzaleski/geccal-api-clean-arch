import SituacaoLivro from '#collection/domain/entities/situacao-livro.vo';
import InvalidSituacaoLivroError from '#collection/domain/erros/invalid-situacao-livro.error';


describe('Situacao Book Unit Tests', function () {
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
