import { mock, MockProxy } from 'jest-mock-extended';
import EventDispatcher from '#shared/event/event-dispacher';
import EventHandlerInterface from '#shared/event/event-handler.interface';
import Event from '#shared/event/event.interface';


describe('EventDispatcher Unit Tests', () => {
  let subject: EventDispatcher;
  let eventHandlerFake: MockProxy<EventHandlerInterface>
  const eventName = 'EventFakeCreated'

  beforeEach(() => {
    subject = new EventDispatcher();
    eventHandlerFake = mock();
  });
  it('should register an event handler', () => {
    subject.register(eventName, eventHandlerFake);

    expect(
      subject.getEventHandlers[eventName]
    ).toBeDefined();
    expect(subject.getEventHandlers[eventName].length).toBe(
      1
    );
    expect(
      subject.getEventHandlers[eventName][0]
    ).toMatchObject(eventHandlerFake);
  });

  it('should unregister an event handler', () => {
    subject.register(eventName, eventHandlerFake);

    expect(
      subject.getEventHandlers[eventName][0]
    ).toMatchObject(eventHandlerFake);

    subject.unregister(eventName, eventHandlerFake);

    expect(
      subject.getEventHandlers[eventName]
    ).toBeDefined();
    expect(subject.getEventHandlers[eventName].length).toBe(
      0
    );
  });

  it('should unregister all event handlers', () => {
    subject.register(eventName, eventHandlerFake);

    expect(
      subject.getEventHandlers[eventName][0]
    ).toMatchObject(eventHandlerFake);

    subject.unregisterAll();

    expect(
      subject.getEventHandlers[eventName]
    ).toBeUndefined();
  });

  it('should notify all event handlers', () => {
    const spyEventHandler = jest.spyOn(eventHandlerFake, 'handle');
    const eventFake: MockProxy<Event> = mock()
    eventFake.name = eventName

    subject.register(eventName, eventHandlerFake);

    expect(
      subject.getEventHandlers[eventName][0]
    ).toMatchObject(eventHandlerFake);


    subject.notify(eventFake);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
