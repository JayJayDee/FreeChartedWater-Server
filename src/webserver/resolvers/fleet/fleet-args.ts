import { InputType, Field } from 'type-graphql';
import { PositionInput } from '../common';

@InputType({ description: 'paramter for moving single fleet' })
export class FleetMoveArgs {

  @Field((type) => Number)
  public fleetNo: number;

  @Field((type) => PositionInput)
  public position: PositionInput;
}
