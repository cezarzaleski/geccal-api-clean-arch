import { Livro } from './livro';
import AutorId from './autor-id.vo';
import EditoraId from './editora-id.vo';


describe('Livro Unit Tests', function () {
  test('constructor of book', () => {
    const criadoEm = new Date()
    const editoraId = new EditoraId()
    const autorId = new AutorId()
    const props = {
      autor: autorId,
      criadoEm: criadoEm,
      edicao: '1ª',
      exemplar: 1,
      ativo: true,
      origem: 'donation',
      editora: editoraId,
      nome: 'book',
      observacao: 'some description'
    }

    const subject = new Livro(props)

    expect(subject.nome).toBe('book')
    expect(subject.autor).toBe(autorId)
    expect(subject.exemplar).toBe(1)
    expect(subject.ativo).toBe(true)
    expect(subject.edicao).toBe('1ª')
    expect(subject.observacao).toBe('some description')
    expect(subject.editora).toBe(editoraId)
    expect(subject.origem).toBe('donation')
    expect(subject.criadoEm).toBe(criadoEm)
  })
});
