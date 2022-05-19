import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '../../../../@shared/domain/repository/repository-contracts';
import { Editora } from "../entities/editora";

export namespace EditoraRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Editora, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Editora,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default EditoraRepository;
