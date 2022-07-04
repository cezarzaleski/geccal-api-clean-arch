import { default as DefaultUseCase } from '#shared/application/use-case';
import EvangelizandoRepository from '#class/domain/repository/evangelizando.repository';
import Evangelizando from '#class/domain/entities/evangelizando';
import { EvangelizandoOutput, EvangelizandoOutputMapper } from '#class/application/dto/evangelizando-output';

export namespace CreateEvangelizandoUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private evangelizandoRepository: EvangelizandoRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = Evangelizando.from(input);
      await this.evangelizandoRepository.insert(entity);
      return EvangelizandoOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    name: string;
    sex: string;
    fatherName?: string;
    motherName?: string;
    birthday?: Date;
    createdAt?: Date;
  };

  export type Output = EvangelizandoOutput;

}
export default CreateEvangelizandoUseCase;
