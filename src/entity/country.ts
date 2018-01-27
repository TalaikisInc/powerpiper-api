import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'
import { IsNotEmpty } from 'class-validator'

@Entity()
@Index('idx_country', ['title'])
export class Country {

    @PrimaryGeneratedColumn()
    public id: number

    @Index()
    @Column({ unique: true })
    @IsNotEmpty()
    public title: string

}
