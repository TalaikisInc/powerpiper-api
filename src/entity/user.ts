import * as bcrypt from 'bcrypt'
import * as uuid from 'uuid/v4'
import { Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    OneToOne,
    JoinColumn,
    Index,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert } from 'typeorm'
import { IsNotEmpty, IsInt, IsAlpha, IsEmail, IsBoolean, IsDate, IsPositive, Matches } from 'class-validator'
import { Role } from './role'
import { Country } from './country'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number

    @Index({ unique: true })
    @Column()
    @IsEmail()
    @IsNotEmpty()
    public email: string

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date

    @Column()
    @IsAlpha()
    public firstName: string

    @Column()
    @IsAlpha()
    public lastName: string

    @Column({ type: 'date', nullable: true })
    @IsDate()
    public birthDate: Date

    @Column({ nullable: true })
    @IsAlpha()
    public street: string

    @Column({ nullable: true })
    @IsInt()
    @IsPositive()
    public homeNo: number

    @Column({ nullable: true })
    @IsInt()
    @IsPositive()
    public aptNo: number

    @Column({ nullable: true })
    @IsAlpha()
    public state: string

    @OneToOne((type) => Country)
    @JoinColumn()
    public country: Country

    @ManyToMany((type) => Role, {
        cascadeInsert: true
    })
    @JoinTable()
    public roles: Role[]

    @Column({ type: 'bool', default: false })
    @IsBoolean()
    public isAdmin: boolean

    @Column({ type: 'bool', default: false })
    @IsBoolean()
    public isStaff: boolean

    @Column({ nullable: true })
    public ethAddress: string

    @Column()
    @IsNotEmpty()
    public password: string

    @Column()
    @IsNotEmpty()
    public emailAccessToken: string

    @Column()
    @IsNotEmpty()
    public salt: string

    @Column({ type: 'bool', default: false })
    @IsBoolean()
    public emailVerified: boolean

    @Column({ type: 'bool', default: false })
    @IsBoolean()
    public linkedWithFacebook: boolean

    @Column({ type: 'bool', default: false })
    @IsBoolean()
    public linkedWithTwitter: boolean

    @Column({ type: 'bool', default: false })
    @IsBoolean()
    public linkedWithGoogle: boolean

    @Column({ type: 'bool', default: false })
    @IsBoolean()
    public linkedWithLinkedin: boolean

    @BeforeInsert()
    private hash() {
        this.emailAccessToken = uuid()
        this.salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(password, this.salt)
    }

}
