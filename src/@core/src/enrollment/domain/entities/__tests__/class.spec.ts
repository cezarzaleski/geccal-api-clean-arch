import Class from '#enrollment/domain/entities/class';
import ClassPropertiesFake from '#enrollment/domain/entities/__tests__/class-properties.fake';


describe('Class Unit Test', () => {
  test('should be defined', () => {
    const classProps = ClassPropertiesFake.build();
    const subject = Class.from(classProps);
    expect(subject).toBeDefined();
  });
});
