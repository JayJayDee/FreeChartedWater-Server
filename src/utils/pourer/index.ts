import { initTypeORM } from '../../libs/typeorm-initiator';

// How to dev: npm run dev:util:pourer
// initial data pourer for FreeChartedWater

(async () => {
  await initTypeORM();
})();
