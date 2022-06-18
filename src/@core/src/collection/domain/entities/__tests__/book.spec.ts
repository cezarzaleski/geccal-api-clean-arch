import BookPropertiesFake from '#collection/domain/entities/__tests__/bookPropertiesFake';
import { Book } from '#collection/domain';


describe('Book Unit Tests', function () {
  test('constructor of livro', () => {

    const bookProps = BookPropertiesFake.build()
    const subject = Book.from(bookProps)

    expect(subject.nome).toBe('livro')
    expect(subject.autores.map(autor => autor.value)).toEqual(bookProps.autores)
    expect(subject.exemplar).toBe(1)
    expect(subject.situacao.value).toBe(bookProps.situacao)
    expect(subject.edicao).toBe('1ª')
    expect(subject.observacao).toBe('some description')
    expect(subject.editoraId.value).toBe(bookProps.editoraId)
    expect(subject.origem.value).toBe(bookProps.origem)
    expect(subject.criadoEm).toBe(bookProps.criadoEm)
  })
});
