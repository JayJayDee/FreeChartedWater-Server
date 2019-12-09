import { InputType, Field } from 'type-graphql';
import { Position } from '../common';

@InputType({ description: 'paramter for moving single fleet' })
export class FleetMoveArgs {

  @Field((type) => Number)
  public fleetNo: number;

  @Field((type) => Position)
  public position: Position;
}
