import { Livro } from '#acervo/livro/domain/entities/livro';
import EditoraId from '#acervo/livro/domain/entities/editora-id.vo';


describe('Livro Unit Tests', function () {
  test('constructor of book', () => {
    const criadoEm = new Date()
    const editoraId = new EditoraId()
    const autores = ['maria', 'pedro']
    const origem = 'donation'
    const situacao = 'disponivel'
    const props = {
      autores: autores,
      criadoEm: criadoEm,
      edicao: '1ª',
      exemplar: 1,
      origem: origem,
      editoraId: editoraId.value,
      nome: 'livro',
      situacao: situacao,
      observacao: 'some description'
    }

    const subject = Livro.from(props)

    expect(subject.nome).toBe('livro')
    expect(subject.autores.map(autor => autor.value)).toEqual(autores)
    expect(subject.exemplar).toBe(1)
    expect(subject.situacao.value).toBe(situacao)
    expect(subject.edicao).toBe('1ª')
    expect(subject.observacao).toBe('some description')
    expect(subject.editoraId.value).toBe(editoraId.value)
    expect(subject.origem.value).toBe(origem)
    expect(subject.criadoEm).toBe(criadoEm)
  })
});
