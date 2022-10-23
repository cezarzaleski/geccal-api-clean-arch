import { Book } from '#collection/domain';

export class BookUnavailableToBorrowError extends Error {
  constructor(public book: Book) {
    super(`Book ${book.name} unavailable`);
    this.name = 'BookUnavailableToBorrowError';
  }
}

export default BookUnavailableToBorrowError;
