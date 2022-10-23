import { mock, MockProxy } from 'jest-mock-extended';
import { CreateClassUseCase } from '#class/application';
import ClassRepository from '#class/domain/repository/class.repository';
import Class from '#class/domain/entities/class';
import { getClassPropertiesFake } from '#class/domain/entities/__tests__/class-properties.fake';

describe('CreateClassUseCase Unit test', function () {

  let subject: CreateClassUseCase.UseCase;
  let repository: MockProxy<ClassRepository.Repository>
  let classEntity: Class

  beforeEach(() => {
    repository = mock()
    subject = new CreateClassUseCase.UseCase(repository);
  });

  it('should create a class', async () => {
    repository.insert.mockResolvedValue()
    const spyInsert = jest.spyOn(repository, 'insert');
    const props = getClassPropertiesFake()

    const output = await subject.execute(props);

    classEntity = repository.insert.mock.calls[0][0]
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: classEntity.id,
      startAt: classEntity.startAt,
      finishAt: classEntity.finishAt,
      year: classEntity.year,
      ciclo: classEntity.ciclo.value,
      createdAt: classEntity.createdAt,
    });
  });

});
