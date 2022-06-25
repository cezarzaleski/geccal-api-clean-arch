import { Book } from '#collection/domain';
import StatusBook from '#collection/domain/entities/status-book.vo';

export default class AvailableBookService {
  static available (aBook: Book) {
    const unavailableBook = aBook.status != StatusBook.AVAILABLE
    if (unavailableBook) throw Error("Book unavailable")
    return true
  }
}
