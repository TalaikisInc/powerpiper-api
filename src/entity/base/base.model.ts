import { Entity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

@Entity()
export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  public id?: string

  @CreateDateColumn()
  public createdAt?: Date

  @UpdateDateColumn()
  public updatedAt?: Date

  @VersionColumn()
  public version?: number

}
