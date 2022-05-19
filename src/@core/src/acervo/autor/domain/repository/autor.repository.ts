import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '../../../../@shared/domain/repository/repository-contracts';
import { Autor } from "../entities/autor";

export namespace AutorRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Autor, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Autor,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default AutorRepository;
