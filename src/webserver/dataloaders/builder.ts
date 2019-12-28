import DataLoader from 'dataloader';
import { EntitySchema, getRepository } from 'typeorm';

export const buildDataLoaderSimple =
  <KEY, TARGET>({ fetcher }: {
    fetcher: (keys: readonly KEY[]) => Promise<TARGET[]>;
  }) =>
    new DataLoader(fetcher, { cache: false });

export const buildDataLoaderTypeORMParent =
  <KEY, TARGET>({ relation, schema }: {
    relation: string,
    schema: EntitySchema<TARGET>,
  }) => {
    return new DataLoader(async (keys) => {
      const elems =
        await getRepository(schema)
          .findByIds(keys as any[], {
            relations: [ relation ],
          });
      // @ts-ignore
      return elems.map((e) => e[relation]) as TARGET[];
    });
  };
