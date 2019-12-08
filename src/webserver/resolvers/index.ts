import { UserResolver } from './user-resolver';
import { ChampionResolver } from './champion-resolver';
import { BaseShipResolver, ShipResolver } from './ship-resolver';
import { FleetResolver } from './fleet-resolver';

export const graphQLResolvers =
  () => {
    return [
      UserResolver,
      ChampionResolver,
      FleetResolver,
      BaseShipResolver, ShipResolver,
    ];
  };
