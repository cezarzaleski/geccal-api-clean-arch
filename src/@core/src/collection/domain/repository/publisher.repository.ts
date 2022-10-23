import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '#shared/domain/repository/repository-contracts';
import { Publisher } from '#collection/domain';

export namespace PublisherRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Publisher, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Publisher,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default PublisherRepository;
