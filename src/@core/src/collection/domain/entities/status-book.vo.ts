import { ValueObject } from '#shared/domain';
import InvalidStatusBookError from '#collection/domain/erros/invalid-status-book.error';


enum StatusBookEnum {
  AVAILABLE = 'available',
  BORROWED = 'borrowed',
  LOSS = 'loss',
  INAPPROPRIATE = 'inappropriate',
  MISPLACED = 'misplaced',
  DONATED = 'donated',
}
export default class StatusBook extends ValueObject<string> {
  static BORROWED = new StatusBook(StatusBookEnum.BORROWED)
  static AVAILABLE = new StatusBook(StatusBookEnum.AVAILABLE)
  static LOSS = new StatusBook(StatusBookEnum.LOSS)
  static INAPPROPRIATE = new StatusBook(StatusBookEnum.INAPPROPRIATE)
  static MISPLACED = new StatusBook(StatusBookEnum.MISPLACED)
  static DONATED = new StatusBook(StatusBookEnum.DONATED)

  static from (value: string) {
    StatusBook.validate(value)
    return new StatusBook(value)
  }

  static with (value: string) {
    return new StatusBook(value)
  }

  equals(aStatusBook: StatusBook) : boolean {
    return this.value === aStatusBook.value;
  }


  static validate(value) {
    const invalidStatus = !Object.values(StatusBookEnum).includes(value)
      if (invalidStatus) throw new InvalidStatusBookError();
  }
}
