import { InputType, Field, Int } from 'type-graphql';
import { PositionInput } from '../common';

@InputType({ description: 'paramter for moving single fleet' })
export class FleetMoveArgs {

  @Field((type) => Int)
  public fleetNo: number;

  @Field((type) => PositionInput)
  public position: PositionInput;
}
