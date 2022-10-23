import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '#shared/domain/repository/repository-contracts';
import Evangelizando from '#class/domain/entities/evangelizando';

export namespace EvangelizandoRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Evangelizando, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Evangelizando,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default EvangelizandoRepository;
