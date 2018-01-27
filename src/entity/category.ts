import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'
import { IsDate } from 'class-validator'

@Entity()
@Index('idx_category', ['slug'])
export class Category {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public title: string

    @Index()
    @Column({ unique: true })
    public slug: string

    @Column('text')
    public content: string

    @Column({ unique: true })
    public image: string

    @Column()
    @IsDate()
    public createdAt: Date

    @Column()
    @IsDate()
    public updatedAt: Date

}
