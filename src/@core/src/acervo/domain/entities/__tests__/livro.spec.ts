import { Livro } from '#acervo/domain/entities/livro';
import LivroPropertiesFake from '#acervo/domain/entities/__tests__/livro.properties.fake';


describe('Livro Unit Tests', function () {
  test('constructor of livro', () => {

    const livroProps = LivroPropertiesFake.build()
    const subject = Livro.from(livroProps)

    expect(subject.nome).toBe('livro')
    expect(subject.autores.map(autor => autor.value)).toEqual(livroProps.autores)
    expect(subject.exemplar).toBe(1)
    expect(subject.situacao.value).toBe(livroProps.situacao)
    expect(subject.edicao).toBe('1ª')
    expect(subject.observacao).toBe('some description')
    expect(subject.editoraId.value).toBe(livroProps.editoraId)
    expect(subject.origem.value).toBe(livroProps.origem)
    expect(subject.criadoEm).toBe(livroProps.criadoEm)
  })
});
