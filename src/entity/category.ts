import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ orderBy: { title: 'ASC' }})
export class Category {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public title: string

    @Column()
    @Index({ unique: true })
    public slug: string

    @Column('text')
    public content: string

    @Column({ unique: true })
    public image: string

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date

}
