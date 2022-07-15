import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Unique(['username'])
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string
}
