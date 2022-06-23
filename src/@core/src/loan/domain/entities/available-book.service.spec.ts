import BookPropertiesFake from '#collection/domain/entities/__tests__/bookPropertiesFake';
import { Book } from '#collection/domain';
import StatusBook from '#collection/domain/entities/status-book.vo';
import AvailableBookService from '#loan/domain/entities/available-book.service';
import { BookUnavailableToBorrowError } from '#loan/domain/erros';

describe('AvailableBookService Unit Tests', () => {
    it('given a book dont available call method available then throw BookUnavailableToBorrowError', () => {
        const book = Book.from(BookPropertiesFake.build({status: StatusBook.LOSS.toString()}))
        expect(() => AvailableBookService.available(book)).toThrow(new BookUnavailableToBorrowError(book))
    });
    it('given a book available call method available then return true', () => {
        const book = Book.from(BookPropertiesFake.build({status: 'available'}))
        expect(AvailableBookService.available(book)).toBeTruthy()
    });
});
