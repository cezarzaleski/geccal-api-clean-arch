import { Editora } from './editora';


describe('Editora Unit Tests', function () {
  test('constructor of editora', () => {
    const criadoEm = new Date()
    const props = {
      nome: 'some editora',
      ativo: true,
      criadoEm: criadoEm
    }

    const subject = new Editora(props)

    expect(subject.nome).toBe('some editora')
    expect(subject.ativo).toBe(true)
    expect(subject.criadoEm).toBe(criadoEm)
  })
});
