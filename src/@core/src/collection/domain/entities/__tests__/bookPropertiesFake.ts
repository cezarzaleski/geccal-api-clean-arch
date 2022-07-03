import { BookProperties } from '#collection/domain';
import { PublisherId } from '#collection/domain/entities/value-objects';



const bookPropertiesFake: BookProperties = {

  authors: ['maria', 'pedro'],
  createdAt: new Date(),
  origin: 'donation',
  status: 'available',
  name: 'livro',
  note: 'some description',
  exemplary: 1,
  edition: '1ª',
  publisherId: new PublisherId().value
}

export const getBookPropertiesFake = (
  bookProperties?: Partial<BookProperties>,
) => ({
  ...bookPropertiesFake,
  ...bookProperties,
});
