import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'
import { IsNotEmpty } from 'class-validator'

@Entity()
@Index('idx_rank', ['title'])
export class Rank {

    @PrimaryGeneratedColumn()
    public id: number

    @Index()
    @IsNotEmpty()
    @Column({ unique: true })
    public title: string

}
