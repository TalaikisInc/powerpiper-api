import { Entity, Index, Column } from 'typeorm'
import { IsNotEmpty } from 'class-validator'

import { Base } from '../base'

@Entity({ orderBy: { createdAt: 'DESC' }})
export abstract class Content extends Base {

    @Column()
    @IsNotEmpty()
    public title: string

    @Column()
    @Index({ unique: true })
    @IsNotEmpty()
    public slug: string

    @Column({ type: 'text', nullable: false })
    @IsNotEmpty()
    public content: string

}
