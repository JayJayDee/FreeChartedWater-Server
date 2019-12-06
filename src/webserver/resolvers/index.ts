export const graphQLResolvers =
  () => {
    const { UserResolver } = require('./user-resolver');
    const { ChampionResolver } = require('./champion-resolver');

    return [
      UserResolver,
      ChampionResolver,
    ];
  };
