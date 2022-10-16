import { Book } from '#collection/domain';


export type BookOutput = {
  id: string
  name: string
  exemplary: number
  status: string
  edition: string
  year: number
  publisherId: string
  authors: Array<string>
  origin: string
  createdAt: Date
};

export class BookOutputMapper {
  static toOutput(entity: Book): BookOutput {
    return {
      id: entity.id,
      name: entity.name,
      exemplary: entity.exemplary,
      year: entity.year,
      publisherId: entity.publisherId.value,
      origin: entity.origin.value,
      authors: entity.authors.map(autor => autor.value),
      edition: entity.edition,
      status: entity.status.value,
      createdAt: entity.createdAt
    }
  }
}
