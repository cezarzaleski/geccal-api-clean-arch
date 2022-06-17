import { UniqueEntityId, ValueObject } from '#shared/domain';


class Autor extends ValueObject<string> {}
class EditoraId extends UniqueEntityId {}
class Origem extends ValueObject<string> {}

export { Autor, EditoraId, Origem };

