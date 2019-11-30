import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  public no: number;

  @Column({
    length: 45,
  })
  public nickname: string;

  @Column({
    length: 45,
  })
  public email: string;

  @Column()
  public verified: boolean;

  @Column({
    length: 80,
  })
  public password: string;
}
