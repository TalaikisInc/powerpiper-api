import { Entity, Column, Index } from 'typeorm'

import { Base } from '../base'

@Entity({ orderBy: { title: 'ASC' }})
export class Category extends Base {

    @Column()
    public title?: string

    @Column()
    @Index({ unique: true })
    public slug?: string

    @Column({ unique: true })
    public image?: string

}
