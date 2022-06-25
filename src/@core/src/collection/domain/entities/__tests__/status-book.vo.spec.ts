import StatusBook from '#collection/domain/entities/status-book.vo';
import InvalidStatusBookError from '#collection/domain/erros/invalid-status-book.error';


describe('Status Book Unit Tests', function () {
  test('given a invalid status when call create book then throw InvalidStatusBookError', () => {
    expect(() =>
      StatusBook.from('invalid')
    ).toThrow(new InvalidStatusBookError(`Status of book invalid`));
  })
  test('given status valid when call create book then return available', () => {
    const statusBookExpected = 'available'

    const subject = StatusBook.from(statusBookExpected)

    expect(subject.value).toBe(statusBookExpected);
  })
});
