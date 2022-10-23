import { ListPublishersUseCase } from '@geccal/core/collection/application';
import { SortDirection } from '@geccal/core/@shared/domain';

export class SearchCategoryInput implements ListPublishersUseCase.Input {
  page?: number;
  perPage?: number;
  sort?: string;
  sortDir?: SortDirection;
  filter?: string;
}
