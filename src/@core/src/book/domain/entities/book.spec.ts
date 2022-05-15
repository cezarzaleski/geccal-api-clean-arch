import { Book } from './book'

describe('Book Unit Tests', function () {
  test('constructor of book', () => {
    const createdAt = new Date()
    const props = {
      author: 'some author',
      createdAt: createdAt,
      edition: '1ª',
      exemplary: 1,
      isActive: true,
      origin: 'donation',
      publishingCompany: 'some publishing Company',
      name: 'book',
      description: 'some description'
    }

    const subject = new Book(props)

    expect(subject.name).toBe('book')
    expect(subject.author).toBe('some author')
    expect(subject.exemplary).toBe(1)
    expect(subject.isActive).toBe(true)
    expect(subject.edition).toBe('1ª')
    expect(subject.description).toBe('some description')
    expect(subject.publishingCompany).toBe('some publishing Company')
    expect(subject.origin).toBe('donation')
    expect(subject.createdAt).toBe(createdAt)
  })
});
