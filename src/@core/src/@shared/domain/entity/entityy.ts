import UniqueEntityId from '../value-objects/unique-entity-id.vo';

export abstract class Entityy {
  public readonly uniqueEntityId: UniqueEntityId;

  constructor(id?: UniqueEntityId) {
    this.uniqueEntityId = id || new UniqueEntityId();
  }

  get id(): string {
    return this.uniqueEntityId.value;
  }
}

export default Entityy;
