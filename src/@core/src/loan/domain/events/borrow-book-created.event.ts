import Event from '#shared/event/event.interface';

export default class BorrowBookCreated implements Event{
  dataTimeOccurred: Date;
  eventData: any;
  name: string;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
    this.name = 'BorrowBookCreated'
  }
}
