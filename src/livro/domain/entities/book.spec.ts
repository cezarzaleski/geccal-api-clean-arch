import { Book } from './book'

describe('Book test', function () {
  test('constructor of book', () => {
    const livro = new Book('livro')
    expect(livro.name).toBe('livro')
  })
});
