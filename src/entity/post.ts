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
        cascadeInsert: true,
        cascadeUpdate: true
    })
    @JoinTable({ name: 'post_categories',
      joinColumn: {
        name: 'post',
        referencedColumnName: 'id'
      },
      inverseJoinColumn: {
        name: 'category',
        referencedColumnName: 'id'
      }
    })
    public categories: Category[]

    @ManyToMany((type) => User, {
        cascadeInsert: true,
        cascadeUpdate: true
    })
    @JoinTable({ name: 'post_authors',
        joinColumn: {
        name: 'post',
        referencedColumnName: 'id'
        },
        inverseJoinColumn: {
        name: 'author',
        referencedColumnName: 'id'
        }
    })
    public authors: User[]

}
