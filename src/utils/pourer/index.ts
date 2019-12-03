import { initTypeORM } from '../../libs/typeorm-initiator';

// How to dev: npm run dev:util:pour
// initial data pourer for FreeChartedWater

(async () => {
  await initTypeORM();
})();
