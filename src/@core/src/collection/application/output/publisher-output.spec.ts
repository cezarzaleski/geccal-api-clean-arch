import { PublisherOutputMapper } from '#collection/application/output/publisher-output';
import { Publisher } from '#collection/domain';


describe('PublisherOutputMapper Unit Tests', () => {
  it('should convert a publisher in output', () => {
    const createdAt = new Date();
    const entity = Publisher.from({
      name: 'Boa Nova',
      createdAt,
    });
    const output = PublisherOutputMapper.toOutput(entity);
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'Boa Nova',
      active: entity.active,
      createdAt,
    })
  });
});
