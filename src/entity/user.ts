import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Index } from 'typeorm'
import { IsNotEmpty, IsInt, IsAlpha, IsEmail, IsBoolean, IsDate, IsPositive, Matches } from 'class-validator'
import { Rank } from './rank'
import { Country } from './country'

@Entity()
@Index('idx_email', ['email'])
export class User {
    @PrimaryGeneratedColumn()
    public id: number

    @Index()
    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    public email: string

    @Column()
    @IsDate()
    public createdAt: Date

    @Column()
    @IsDate()
    public updatedAt: Date

    @Column()
    @IsAlpha()
    public firstName: string

    @Column()
    @IsAlpha()
    public lastName: string

    @Column()
    @IsAlpha()
    public street: string

    @Column()
    @IsInt()
    @IsPositive()
    public homeNo: number

    @Column()
    @IsInt()
    @IsPositive()
    public aptNo: number

    @Column()
    @IsAlpha()
    public state: string

    @OneToOne((type) => Country)
    @JoinColumn()
    public country: Country

    @OneToOne((type) => Rank)
    @JoinColumn()
    public rank: Rank

    @Column()
    private ethAddress: string

    @Column()
    @IsNotEmpty()
    private password: string

    @Column()
    @IsNotEmpty()
    private emailAccessToken: string

    @Column()
    @IsNotEmpty()
    private salt: string

    @Column({ default: false })
    @IsBoolean()
    private emailVerified: boolean

    @Column({ default: false })
    @IsBoolean()
    private linkedWithFacebook: boolean

    @Column({ default: false })
    @IsBoolean()
    private linkedWithTwitter: boolean

    @Column({ default: false })
    @IsBoolean()
    private linkedWithGoogle: boolean

    @Column({ default: false })
    @IsBoolean()
    private linkedWithLinkedin: boolean

}
