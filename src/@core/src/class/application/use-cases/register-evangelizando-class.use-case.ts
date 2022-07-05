import { default as DefaultUseCase } from '#shared/application/use-case';
import EvangelizandoRepository from '#class/domain/repository/evangelizando.repository';
import { EvangelizandoOutput } from '#class/application/dto/evangelizando-output';
import { ClassRepository } from '#class/domain';
import { ClassOutputMapper } from '#class/application';

export namespace RegisterEvangelizandoClassUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private classRepository: ClassRepository.Repository,
      private evangelizandoRepository: EvangelizandoRepository.Repository
    ) {}

    async execute(input: Input): Promise<any> {
      const { classId, evangelizandoIds } = input;
      const classEntity = await this.classRepository.findById(classId);
      for (const evangelizandoId of evangelizandoIds) {
        const evangelizandoEntity = await this.evangelizandoRepository.findById(evangelizandoId);
        classEntity.addEnrollment(evangelizandoEntity.uniqueEntityId);
      }
      await this.classRepository.update(classEntity);
      return ClassOutputMapper.toOutput(classEntity);
    }
  }

  export type Input = {
    classId: string;
    evangelizandoIds: Array<string>;
  };

  export type Output = EvangelizandoOutput;

}
export default RegisterEvangelizandoClassUseCase;
