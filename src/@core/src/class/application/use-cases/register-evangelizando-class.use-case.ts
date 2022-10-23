import { default as DefaultUseCase } from '#shared/application/use-case';
import EvangelizandoRepository from '#class/domain/repository/evangelizando.repository';
import { EvangelizandoOutput } from '#class/application/output/evangelizando-output';
import { ClassRepository } from '#class/domain';
import { ClassOutputMapper } from '#class/application';
import EventDispatcherInterface from '#shared/event/event-dispatcher.interface';
import EnrollmentCreated from '#class/domain/events/enrollment-created.event';
import Class from '#class/domain/entities/class';

export namespace RegisterEvangelizandoClassUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private classRepository: ClassRepository.Repository,
      private evangelizandoRepository: EvangelizandoRepository.Repository,
      private eventDispatcherInterface: EventDispatcherInterface
    ) {
    }

    async execute(input: Input): Promise<any> {
      const {classId, evangelizandoIds} = input;
      const classEntity = await this.classRepository.findById(classId);
      await this.addEnrollment(evangelizandoIds, classEntity);
      await this.classRepository.update(classEntity);
      this.enrollmentCreatedNotify(classEntity);
      return ClassOutputMapper.toOutput(classEntity);
    }

    private async addEnrollment(evangelizandoIds: Array<string>, classEntity: Class) {
      for (const evangelizandoId of evangelizandoIds) {
        const evangelizandoEntity = await this.evangelizandoRepository.findById(evangelizandoId);
        classEntity.addEnrollment(evangelizandoEntity.uniqueEntityId);
      }
    }

    private enrollmentCreatedNotify(classEntity: Class) {
      classEntity.enrollments.forEach(it => {
        const enrollmentCreated = new EnrollmentCreated({
          evangelizandoId: it.evangelizandoId.value,
          enrollmentId: it.id,
          createAt: it.createdAt
        })
        this.eventDispatcherInterface.notify(enrollmentCreated)
      })
    }
  }

  export type Input = {
    classId: string;
    evangelizandoIds: Array<string>;
  };

  export type Output = EvangelizandoOutput;

}
