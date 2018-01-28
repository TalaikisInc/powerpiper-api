import { Entity, Column, ManyToMany, JoinTable } from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { Content } from './abstract/content'
import { User } from './user'
import { Category } from './category'

@Entity()
export class Post extends Content {

    @Column({ unique: true })
    @IsNotEmpty()
    public image: string

    @ManyToMany((type) => Category, {
        cascadeInsert: true
    })
    @JoinTable()
    public categories: Category[]

    @ManyToMany((type) => User, {
        cascadeInsert: true
    })
    @JoinTable()
    public author: User[]

}
