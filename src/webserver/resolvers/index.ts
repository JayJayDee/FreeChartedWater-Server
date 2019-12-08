import { UserResolver } from './user-resolver';
import { ChampionResolver } from './champion-resolver';
import { BaseShipResolver, ShipResolver } from './ship-resolver';
import { FleetResolver } from './fleet-resolver';
import { BaseItemResolver, ItemResolver } from './item-resolver';

export const graphQLResolvers =
  () => {
    return [
      UserResolver,
      BaseItemResolver, ItemResolver,
      ChampionResolver,
      FleetResolver,
      BaseShipResolver, ShipResolver,
    ];
  };
