import { Resolver, FieldResolver, Root } from 'type-graphql';
import { SeaSection } from '../../../libs/entities';
import { Rect } from '../../../libs/entities/common';

@Resolver((type) => SeaSection)
export class SeaSectionResolver {

  @FieldResolver((type) => Rect)
  public async region(@Root() root: SeaSection) {
    const region = new Rect();
    // TODO: region to be implemented
    return region;
  }
}
