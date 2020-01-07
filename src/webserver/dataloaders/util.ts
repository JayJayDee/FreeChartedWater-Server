import DataLoader from 'dataloader';

export const loadOrCreate =
  <T, Q>({ loaderStore, builder, key }: {
    loaderStore: {[key: string]: any},
    builder: () => DataLoader<T, Q>,
    key: string,
  }) => {
    if (loaderStore[key]) {
      return loaderStore[key] as DataLoader<T, Q>;
    }
    loaderStore[key] = builder();
    return loaderStore[key] as DataLoader<T, Q>;
  };
