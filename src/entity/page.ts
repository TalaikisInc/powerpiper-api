import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'
import { IsNotEmpty, IsDate } from 'class-validator'

@Entity()
@Index('idx_page', ['slug'])
export class Page {

    @PrimaryGeneratedColumn()
    public id: number

    @IsNotEmpty()
    @Column()
    public title: string

    @Index()
    @Column({ unique: true })
    public slug: string

    @Column()
    @IsDate()
    public createdAt: Date

    @Column()
    @IsDate()
    public updatedAt: Date

}
