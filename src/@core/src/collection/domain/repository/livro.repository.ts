import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '#shared/domain/repository/repository-contracts';
import { Book } from '#collection/domain';

export namespace LivroRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Book, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Book,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default LivroRepository;
