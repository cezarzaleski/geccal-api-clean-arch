
import { PaginationOutputMapper } from '#shared/application';
import { SearchResult } from '#shared/domain';

describe('PaginationOutputMapper Unit Tests', () => {
  it('should convert a SearchResult in output', () => {
    const result = new SearchResult({
      items: ['fake'] as any,
      total: 1,
      currentPage: 1,
      perPage: 1,
      sort: 'name',
      sortDir: 'desc',
      filter: 'fake',
    });
    const output = PaginationOutputMapper.toOutput(result.items, result);
    expect(output).toStrictEqual({
      items: ['fake'],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
    });
  });
});
