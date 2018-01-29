import { Entity, Index, PrimaryGeneratedColumn, Column,
    CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import slugify from '../../utils/slugify'

@Entity({ orderBy: { createdAt: 'DESC' }})
export abstract class Content {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    @IsNotEmpty()
    public title: string

    @Column()
    @Index({ unique: true })
    @IsNotEmpty()
    public slug: string

    @Column({ type: 'text', nullable: false })
    public content: string

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date

    @BeforeInsert()
    private slugMaker() {
        this.slug = slugify(this.title)
    }

}
