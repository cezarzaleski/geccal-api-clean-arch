import { PublisherOutputMapper } from '#collection/application/dto/publisher-output';
import { Publisher } from '#collection/domain';


describe('PublisherOutputMapper Unit Tests', () => {
  it('should convert a publisher in output', () => {
    const createdAt = new Date();
    const entity = Publisher.from({
      name: 'Boa Nova',
      ativo: true,
      createdAt,
    });
    const output = PublisherOutputMapper.toOutput(entity);
    expect(output).toStrictEqual({
        id: entity.id,
        name: 'Boa Nova',
        ativo: true,
        createdAt,
    })
  });
});
