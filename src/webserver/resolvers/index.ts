import { UserResolver } from './user-resolver';

import { FleetResolver } from './fleet';
import { ChampionResolver } from './champion';
import { BaseProductResolver, ProductResolver } from './product';
import { CountryResolver, CityResolver } from './city';
import { BaseShipResolver, ShipResolver } from './ship';
import { BaseItemResolver, ItemResolver } from './item';

export const graphQLResolvers =
  () => {
    return [
      UserResolver,
      BaseItemResolver, ItemResolver,
      ChampionResolver,
      FleetResolver,
      BaseShipResolver, ShipResolver,
      BaseProductResolver, ProductResolver,
      CountryResolver, CityResolver,
    ];
  };
