import DataLoader from 'dataloader';
import { City, User, SeaSection, Ship } from '../../libs/entities';

export type FCWContext = {
  _loaderInstances: {[key: string]: any};
  loaders: {
    fleet: {
      anchoredCity: () => DataLoader<number, City | null>,
      owner: () => DataLoader<number, User>,
      seaSection: () => DataLoader<number, SeaSection | null>,
      ships: () => DataLoader<number, Ship[]>,
    },
  },
};
