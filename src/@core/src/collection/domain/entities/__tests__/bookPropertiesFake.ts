import { BookProperties } from '#collection/domain';
import { EditoraId } from '#collection/domain/entities/value-objects';


export default class BookPropertiesFake {
  static build({
                 authors = ['maria', 'pedro'],
                 createdAt = new Date(),
                 origin = 'donation',
                 status = 'disponivel',
                 name = 'livro',
                 note = 'some description',
                 exemplary = 1,
                 edition = '1ª',
                 publisherId = new EditoraId().value
               }: {
                 authors?: string[];
                 createdAt?: Date,
                 origin?: string,
                 exemplary?: number,
                 status?: string,
                 name?: string,
                 edition?: string,
                 note?: string,
                 publisherId?: string
               } = {}
  ): BookProperties {
    return {
      authors: authors,
      createdAt: createdAt,
      edition: edition,
      exemplary: exemplary,
      origin: origin,
      publisherId: publisherId,
      name: name,
      status: status,
      note: note
    }
  }
}
