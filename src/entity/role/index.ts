import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'
import { IsNotEmpty } from 'class-validator'

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    public id?: number

    @Index({ unique: true })
    @IsNotEmpty()
    @Column()
    public title?: string

}
