import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '#shared/domain/repository/repository-contracts';
import { Loan, RegistrationId } from '#loan/domain';

export namespace LoanRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Loan, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Loan,
      Filter,
      SearchParams,
      SearchResult
    > {
    countLoansPendingByRegistrationId(registrationId: RegistrationId): Promise<number>;
  }
}

export default LoanRepository;
