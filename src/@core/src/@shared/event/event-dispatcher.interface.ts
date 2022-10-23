import EventHandlerInterface from '#shared/event/event-handler.interface';
import Event from '#shared/event/event.interface';


export default interface EventDispatcherInterface {
  notify(event: Event): void;
  register(eventName: string, eventHandler: EventHandlerInterface): void;
  unregister(eventName: string, eventHandler: EventHandlerInterface): void;
  unregisterAll(): void;
}
