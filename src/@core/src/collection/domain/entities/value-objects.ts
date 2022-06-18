import { UniqueEntityId, ValueObject } from '#shared/domain';


class Author extends ValueObject<string> {}
class EditoraId extends UniqueEntityId {}
class Origin extends ValueObject<string> {}

export { Author, EditoraId, Origin };

