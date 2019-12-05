export const graphQLResolvers =
  () => {
    const { UserResolver } = require('./user-resolver');

    return [
      UserResolver,
    ];
  };
