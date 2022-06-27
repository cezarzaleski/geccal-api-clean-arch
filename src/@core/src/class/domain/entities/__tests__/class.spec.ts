import ClassPropertiesFake from '#class/domain/entities/__tests__/class-properties.fake';
import Class from '#class/domain/entities/class';


describe('Class Unit Test', () => {
  test('should be defined', () => {
    const classProps = ClassPropertiesFake.build();
    const subject = Class.from(classProps);
    expect(subject).toBeDefined();
  });
});
