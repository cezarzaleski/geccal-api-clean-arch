import { mock, MockProxy } from 'jest-mock-extended';
import EvangelizandoRepository from '#class/domain/repository/evangelizando.repository';
import { getEvangelizandoPropertiesFake } from '#class/domain/entities/__tests__/evangelizando-properties.fake';
import { RegisterEvangelizandoClassUseCase } from '#class/application';
import ClassRepository from '#class/domain/repository/class.repository';
import Evangelizando from '#class/domain/entities/evangelizando';
import Class from '#class/domain/entities/class';
import { getClassPropertiesFake } from '#class/domain/entities/__tests__/class-properties.fake';

describe('RegisterEvangelizandoClassUseCase Unit test', function () {

  let subject: RegisterEvangelizandoClassUseCase.UseCase;
  let classRepository: MockProxy<ClassRepository.Repository>
  let evangelizandoRepository: MockProxy<EvangelizandoRepository.Repository>

  beforeEach(() => {
    evangelizandoRepository = mock()
    classRepository = mock()
    subject = new RegisterEvangelizandoClassUseCase.UseCase(classRepository, evangelizandoRepository);
  });

  it('should register a evangelizando in the class', async () => {
    const evangelizando = Evangelizando.from(getEvangelizandoPropertiesFake());
    const classEntity = Class.from(getClassPropertiesFake());
    evangelizandoRepository.findById.mockResolvedValue(evangelizando)
    classRepository.findById.mockResolvedValue(classEntity)
    const spyClassUpdate = jest.spyOn(classRepository, 'update');
    const input = {
      classId: classEntity.id,
      evangelizandoIds: [evangelizando.id]
    }

    const output = await subject.execute(input);

    const classEntityUpdated = classRepository.update.mock.calls[0][0]
    expect(spyClassUpdate).toHaveBeenCalledTimes(1);
    expect(classEntityUpdated.enrollments.length).toBe(1);
    expect(classEntityUpdated.enrollments.map(it => it.evangelizandoId.value)).toContain(evangelizando.id);
    expect(output).toStrictEqual({
      id: classEntityUpdated.id,
      startAt: classEntityUpdated.startAt,
      finishAt: classEntityUpdated.finishAt,
      year: classEntityUpdated.year,
      ciclo: classEntityUpdated.ciclo.value,
      createdAt: classEntityUpdated.createdAt
    });
  });

});
