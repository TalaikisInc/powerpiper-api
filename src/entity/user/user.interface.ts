import { IBase } from '../base'
import { Role } from './../role'
import { Country } from './../country'

// Should define Base attributes for access inside controller for srvice
export interface IUser extends IBase {
    email: string
    password: string
    salt: string
    emailAccessToken: string
    firstName: string
    lastName: string
    birthDate: Date
    street: string
    homeNo: number
    aptNo: number
    state: string
    country: Country
    roles: Role[]
    isAdmin: boolean
    isStaff: boolean
    ethAddress: string
    emailVerified: boolean
    linkedWithFacebook: boolean
    linkedWithTwitter: boolean
    linkedWithGoogle: boolean
    linkedWithLinkedin: boolean
    loginTries: number
    signedIn: boolean
}
