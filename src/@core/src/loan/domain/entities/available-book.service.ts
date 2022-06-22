import { Book } from '#collection/domain';
import StatusBook from '#collection/domain/entities/status-book.vo';
import { BookUnavailableToBorrowError } from '#loan/domain/erros';

export default class AvailableBookService {
  static available (aBook: Book) {
    const unavailableBook = !aBook.status.equals(StatusBook.AVAILABLE)
    if (unavailableBook) throw new BookUnavailableToBorrowError(aBook)
    return true
  }
}
