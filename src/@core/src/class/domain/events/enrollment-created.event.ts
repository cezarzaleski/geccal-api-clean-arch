import Event from '#shared/event/event.interface';

export default class EnrollmentCreated implements Event{
  dataTimeOccurred: Date;
  eventData: EnrollmentCreatedPayload;
  name: string;

  constructor(enrollment: EnrollmentCreatedPayload, ) {
    this.dataTimeOccurred = new Date();
    this.eventData = enrollment;
    this.name = 'EnrollmentCreated'
  }
}
export type EnrollmentCreatedPayload = {
  evangelizandoId: string,
  enrollmentId: string,
  createAt: Date
}
