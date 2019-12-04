import { initTypeORM } from '../../libs/typeorm-initiator';
import { AllEntities } from '../../libs/entities';
import { EntitySchema } from 'typeorm';

// How to dev: npm run dev:util:sync
// database schema synchronizer for FreeChartedWater

(async () => {
  const synchronize = true;
  await initTypeORM({
    synchronize,
    logging: true,
    entities: AllEntities,
  });
})();
