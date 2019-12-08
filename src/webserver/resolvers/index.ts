export const graphQLResolvers =
  () => {
    const { UserResolver } = require('./user-resolver');
    const { ChampionResolver } = require('./champion-resolver');
    const { BaseShipResolver, ShipResolver } = require('./ship-resolver');

    return [
      UserResolver,
      ChampionResolver,
      BaseShipResolver, ShipResolver,
    ];
  };
