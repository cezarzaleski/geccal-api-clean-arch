import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '../../../../@shared/domain/repository/repository-contracts';
import { Livro } from '#acervo/livro/domain';

export namespace LivroRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Livro, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Livro,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default LivroRepository;
