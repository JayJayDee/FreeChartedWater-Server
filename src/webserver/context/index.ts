import DataLoader from 'dataloader';
import { City, User, SeaSection, Ship } from '../../libs/entities';
import { DataLoders } from '../dataloaders';

export type FCWContext = {
  _loaderInstances: {[key: string]: any};
  loaders: DataLoders;
};
