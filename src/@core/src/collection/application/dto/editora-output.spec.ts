import { EditoraOutputMapper } from '#collection/application/dto/editora-output';
import { Editora } from '#collection/domain';


describe('EditoraOutputMapper Unit Tests', () => {
  it('should convert a editora in output', () => {
    const criadoEm = new Date();
    const entity = Editora.from({
      nome: 'Boa Nova',
      ativo: true,
      criadoEm,
    });
    const output = EditoraOutputMapper.toOutput(entity);
    expect(output).toStrictEqual({
        id: entity.id,
        nome: 'Boa Nova',
        ativo: true,
        criadoEm,
    })
  });
});
