import { User } from './user';
import { Ship, BaseShip } from './ship';
import { SeaSection, Ocean } from './sea';
import { Product, BaseProduct, ProductStatusEnum } from './product';
import { Item, BaseItem } from './item';
import { Fleet } from './fleet';
import { City, Country } from './city';
import { Champion, BaseChampion, ChampionStatusEnum } from './champion';

const AllEntities = [
  User,
  Ship, BaseShip,
  SeaSection, Ocean,
  Product, BaseProduct,
  Item, BaseItem,
  Fleet,
  City, Country,
  Champion, BaseChampion,
];

export {
  AllEntities,
  User,
  Ship, BaseShip,
  SeaSection, Ocean,
  Product, BaseProduct,
  Item, BaseItem,
  Fleet,
  City, Country,
  Champion, BaseChampion,
};

export const Enums = {
  ProductStatusEnum,
  ChampionStatusEnum,
};
