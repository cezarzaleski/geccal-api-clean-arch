import { mock, MockProxy } from 'jest-mock-extended';
import EvangelizandoRepository from '#class/domain/repository/evangelizando.repository';
import Evangelizando from '#class/domain/entities/evangelizando';
import { getEvangelizandoPropertiesFake } from '#class/domain/entities/__tests__/evangelizando-properties.fake';
import { CreateEvangelizandoUseCase } from '#class/application';

describe('CreateEvangelizandoUseCase Unit test', function () {

  let subject: CreateEvangelizandoUseCase.UseCase;
  let repository: MockProxy<EvangelizandoRepository.Repository>
  let evangelizando: Evangelizando

  beforeEach(() => {
    repository = mock()
    subject = new CreateEvangelizandoUseCase.UseCase(repository);
  });

  it('should create a evangelizando', async () => {
    repository.insert.mockResolvedValue()
    const spyInsert = jest.spyOn(repository, 'insert');
    const props = getEvangelizandoPropertiesFake()

    const output = await subject.execute(props);

    evangelizando = repository.insert.mock.calls[0][0]
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: evangelizando.id,
      name: evangelizando.name,
      createdAt: evangelizando.createdAt,
      birthday: evangelizando.birthday,
      fatherName: evangelizando.fatherName,
      motherName: evangelizando.motherName,
      sex: evangelizando.sex,
    });
  });

});
