import DataLoader from 'dataloader';

export const buildDataLoader =
  <KEY, TARGET>({ fetcher }: {
    fetcher: (keys: readonly KEY[]) => Promise<TARGET[]>;
  }) =>
    new DataLoader(fetcher, { cache: false });
