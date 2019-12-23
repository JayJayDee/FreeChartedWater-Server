import { log } from '../../../libs/logger';
import { getRepository, Not, IsNull } from 'typeorm';
import { Fleet, AllEntities } from '../../../libs/entities';
import { initTypeORM } from '../../../libs/typeorm-initiator';

const tag = '[job:move-fleet]';

export const moveFleetJob =
  async () => {
    log.debug(`${tag} job started.`);

    const movingFleets = await getRepository(Fleet).find({
      where: {
        direction: Not(IsNull()),
      },
    });

    console.log(movingFleets);

    log.debug(`${tag} job ended.`);
  };

// TODO: dev-purpose, to be deleted.
(async () => {
  await initTypeORM({
    entities: AllEntities,
  });
  await moveFleetJob();
})();
/////
