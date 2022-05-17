import { Autor } from './autor';


describe('Autor Unit Tests', function () {
  test('constructor of autor', () => {
    const criadoEm = new Date()
    const props = {
      nome: 'some autor',
      ativo: true,
      criadoEm: criadoEm
    }

    const subject = new Autor(props)

    expect(subject.nome).toBe('some autor')
    expect(subject.ativo).toBe(true)
    expect(subject.criadoEm).toBe(criadoEm)
  })
});
