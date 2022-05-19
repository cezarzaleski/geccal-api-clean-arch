import { AutorOutputMapper } from './autor-output';
// import {Autor} from "#acervo/autor/domain";
import { Autor } from '../../domain/entities/autor';


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
