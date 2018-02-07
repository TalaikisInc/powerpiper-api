import { Column, Entity, ManyToMany, OneToOne, JoinColumn, Index, JoinTable } from 'typeorm'
import { IsNotEmpty, IsInt, IsAlpha, IsEmail, IsBoolean, IsDate, IsPositive, Matches } from 'class-validator'

import { Base } from './../base'
import { Role } from './../role'
import { Country } from './../country'

@Entity()
export class User extends Base {
    @Index({ unique: true })
    @Column()
    @IsEmail()
    @IsNotEmpty()
    public email?: string

    @Column()
    @IsNotEmpty()
    public password: string

    @Column()
    @IsNotEmpty()
    public emailAccessToken?: string

    @Column()
    @IsNotEmpty()
    public salt: string

    @Column('varchar', { nullable: true })
    @IsAlpha()
    public firstName?: string

    @Column('varchar', { nullable: true })
    @IsAlpha()
    public lastName?: string

    @Column('date', { nullable: true })
    @IsDate()
    public birthDate?: Date

    @Column({ nullable: true })
    @IsAlpha()
    public street?: string

    @Column({ nullable: true })
    @IsInt()
    @IsPositive()
    public homeNo?: number

    @Column({ nullable: true })
    @IsInt()
    @IsPositive()
    public aptNo?: number

    @Column({ nullable: true })
    @IsAlpha()
    public state?: string

    @OneToOne((type) => Country)
    @JoinColumn({ name: 'country_id' })
    public country?: Country

    @ManyToMany((type) => Role, {
        cascadeInsert: true,
        cascadeUpdate: true
    })
    @JoinTable({ name: 'user_roles',
        joinColumn: {
        name: 'user',
        referencedColumnName: 'id'
        },
        inverseJoinColumn: {
        name: 'role',
        referencedColumnName: 'id'
        }
    })
    public roles?: Role[]

    @Column({ type: 'bool', default: false })
    @IsBoolean()
    public isAdmin?: boolean

    @Column({ type: 'bool', default: false })
    @IsBoolean()
    public isStaff?: boolean

    @Column({ nullable: true })
    public ethAddress?: string

    @Column({ type: 'bool', default: false })
    @IsBoolean()
    public emailVerified?: boolean

    @Column({ type: 'bool', default: false })
    @IsBoolean()
    public linkedWithFacebook?: boolean

    @Column({ type: 'bool', default: false })
    @IsBoolean()
    public linkedWithTwitter?: boolean

    @Column({ type: 'bool', default: false })
    @IsBoolean()
    public linkedWithGoogle?: boolean

    @Column({ type: 'bool', default: false })
    @IsBoolean()
    public linkedWithLinkedin?: boolean

    @Column({ type: 'number', default: 0 })
    public loginTries?: number

    @Column({ type: 'bool', default: false })
    @IsBoolean()
    public signedIn?: boolean

}
