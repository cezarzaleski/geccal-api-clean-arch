
import { Autor } from '#acervo/domain/entities/autor';
import { AutorOutputMapper } from '#acervo/application/dto/autor-output';


describe('AutorOutputMapper Unit Tests', () => {
  it('should convert a autor in output', () => {
    const criadoEm = new Date();
    const entity = new Autor({
      nome: 'Adeilson',
      ativo: true,
      criadoEm,
    });
    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = AutorOutputMapper.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalled();
    expect(output).toStrictEqual({
        id: entity.id,
        nome: 'Adeilson',
        ativo: true,
        criadoEm,
    })
  });
});
