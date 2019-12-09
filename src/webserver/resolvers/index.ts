import { UserResolver } from './user-resolver';
import { ChampionResolver } from './champion-resolver';
import { BaseShipResolver, ShipResolver } from './ship-resolver';
import { BaseItemResolver, ItemResolver } from './item-resolver';
import { BaseProductResolver, ProductResolver } from './product-resolver';

import { FleetResolver } from './fleet';
import { CountryResolver, CityResolver } from './city';

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
