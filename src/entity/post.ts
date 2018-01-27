import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Index, JoinTable, JoinColumn, OneToOne } from 'typeorm'
import { Category } from './category'
import { User } from './user'
import { IsNotEmpty, IsDate } from 'class-validator'

@Entity()
@Index('idx_post', ['slug'])
export class Post {

    @PrimaryGeneratedColumn()
    public id: number

    @IsNotEmpty()
    @Column()
    public title: string

    @Index()
    @Column({ unique: true })
    public slug: string

    @Column({ unique: true })
    public image: string

    @Column()
    @IsDate()
    public createdAt: Date

    @Column()
    @IsDate()
    public updatedAt: Date

    @IsNotEmpty()
    @Column('text')
    public content: string

    @ManyToMany((type) => Category, {
        cascadeInsert: true
    })
    @JoinTable()
    public categories: Category[]

    @OneToOne((type) => User)
    @JoinColumn()
    public author: User

}
