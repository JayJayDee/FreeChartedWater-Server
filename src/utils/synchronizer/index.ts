import { initTypeORM } from '../../libs/typeorm-initiator';
import { AllEntities } from '../../libs/entities';
import { log } from '../../libs/logger';

// How to dev: npm run dev:util:sync
// database schema synchronizer for FreeChartedWater

const tag = '[schema-synchronizer]';

(async () => {
  log.info(`${tag} starting schema synchronizing..`);

  const synchronize = true;
  const logging = true;

  await initTypeORM({
    synchronize,
    logging,
    entities: AllEntities,
  });

  log.info(`${tag} schema synchronized successfully.`);
})();
