import { Publisher } from '#collection/domain';


describe('Publisher Unit Tests', function () {
  test('constructor of publisher', () => {
    const createdAt = new Date()
    const props = {
      name: 'some publisher',
      ativo: true,
      createdAt: createdAt
    }

    const subject = Publisher.from(props)

    expect(subject.name).toBe('some publisher')
    expect(subject.ativo).toBe(true)
    expect(subject.createdAt).toBe(createdAt)
  })
});
