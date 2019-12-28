import DataLoader from 'dataloader';
import { EntitySchema, getRepository } from 'typeorm';

export const buildDataLoaderSimple =
  <KEY, TARGET>({ fetcher }: {
    fetcher: (keys: readonly KEY[]) => Promise<TARGET[]>;
  }) =>
    new DataLoader(fetcher, { cache: false });

export const buildDataLoaderTypeORMParent =
  <KEY, BASE, TARGET>({ relation, schema }: {
    relation: string,
    schema: EntitySchema<BASE>,
  }) => {
    return new DataLoader(async (keys: readonly KEY[]) => {
      const elems =
        await getRepository(schema)
          .findByIds(keys as KEY[], {
            relations: [ relation ],
          });
      // @ts-ignore
      return elems.map((e) => e[relation]) as TARGET[];
    });
  };
