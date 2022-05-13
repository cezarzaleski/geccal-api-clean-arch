import { Livro } from './livro'

describe('Livro test', function () {
  test('constructor of category', () => {
    const livro = new Livro('livro')
    expect(livro.name).toBe('livro')
  })
});
