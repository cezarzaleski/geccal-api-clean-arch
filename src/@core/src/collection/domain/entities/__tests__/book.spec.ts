import { getBookPropertiesFake } from '#collection/domain/entities/__tests__/bookPropertiesFake';
import { Book } from '#collection/domain';


describe('Book Unit Tests', function () {
  test('constructor of livro', () => {

    const bookProps = getBookPropertiesFake();
    const subject = Book.from(bookProps)

    expect(subject.name).toBe('livro')
    expect(subject.authors.map(autor => autor.value)).toEqual(bookProps.authors)
    expect(subject.exemplary).toBe(1)
    expect(subject.status.value).toBe(bookProps.status)
    expect(subject.edition).toBe('1ª')
    expect(subject.note).toBe('some description')
    expect(subject.publisherId.value).toBe(bookProps.publisherId)
    expect(subject.origin.value).toBe(bookProps.origin)
    expect(subject.createdAt).toBe(bookProps.createdAt)
  })
});
