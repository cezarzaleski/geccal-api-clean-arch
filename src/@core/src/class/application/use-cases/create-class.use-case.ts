import { default as DefaultUseCase } from '#shared/application/use-case';
import { ClassRepository } from '#class/domain/repository/class.repository';
import Class from '#class/domain/entities/class';
import { ClassOutput, ClassOutputMapper } from '#class/application';

export namespace CreateClassUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private classRepository: ClassRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = Class.from(input);
      await this.classRepository.insert(entity);
      return ClassOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    startAt: Date;
    finishAt: Date;
    year: number;
    ciclo: string;
    createdAt?: Date;
  };

  export type Output = ClassOutput;

}
export default CreateClassUseCase;
