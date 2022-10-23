import { getClassPropertiesFake } from '#class/domain/entities/__tests__/class-properties.fake';
import Class from '#class/domain/entities/class';
import { EntityValidationError } from '#shared/domain';


describe('Class Unit Test', () => {
  test('should be defined', () => {
    const classProps = getClassPropertiesFake();
    const subject = Class.from(classProps);
    expect(subject).toBeDefined();
  });

  test('should be throw EntityValidationError when year is null', () => {
    const classProps = getClassPropertiesFake({year: null})
    expect(() => {
      Class.from(classProps);
    }).toThrow(new EntityValidationError(
      {
        year: [
          'year should not be equal to null',
          'year must be a number conforming to the specified constraints'
        ]
      }
    ))
  });
});
