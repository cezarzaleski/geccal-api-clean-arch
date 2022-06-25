import { UniqueEntityId, ValueObject } from '#shared/domain';


class Author extends ValueObject<string> {}
class PublisherId extends UniqueEntityId {}
class Origin extends ValueObject<string> {}

export { Author, PublisherId, Origin };

