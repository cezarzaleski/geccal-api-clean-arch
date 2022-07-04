import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '#shared/domain/repository/repository-contracts';
import Class from '#class/domain/entities/class';

export namespace ClassRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Class, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Class,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default ClassRepository;
