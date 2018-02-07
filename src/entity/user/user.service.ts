import { encode } from 'jwt-simple'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { OrmRepository } from 'typeorm-typedi-extensions'

import { IUser } from './user.interface'
import { ISignin } from './signin.interface'
import { User } from './user.model'
import _ENV_ from '../../config'
import { emailService } from '../../services'
import { encryptionService } from '../../services'

@Service()
export class UserService {
  @OrmRepository(User) private repository: Repository<User>

  public getAll(perPage: number = 10, page: number = 0) {
    const skip: number = perPage * (page)

    this.repository.findAndCount({
        skip,
        take: page
      })
  }

  public create(props: IUser): Promise<User> {
    return this.repository.save(props)
  }

  // @ TODO: should be tested
  public getByRole(role: number, perPage: number = 10, page: number = 0) {
    const skip: number = perPage * (page)

    return this.repository.query(`SELECT
          users.id,
          users.email,
          users.firstName,
          users.lastName
        FROM user AS users
        INNER JOIN user_roles AS userRoles ON users.id = userRoles.user
        INNER JOIN role AS roles ON userRoles.role = roles.id
        WHERE roles.id = ${role}
        LIMIT ${perPage} OFFSET ${skip}`)
  }

  public getOneById(id: string) {
    return this.repository.findOneById(id)
  }

  public passReset(email: string) {
    const user = this.getOneByEmail(email)
    if (user) {
      user.emailAccessToken = encryptionService.token()
      emailService.sendVerificationEmail(user.email, user.emailAccessToken)
      this.repository.save(user)
    }
  }

  public confirmEmail(token: string): Promise<User> {
    const user = this.getOneByToken(token)
    if (user) {
      user.emailVerified = true
      this.repository.save(user)
    }
    return user
  }

  public signin(props: ISignin): any {
    const user = this.getOneByEmail(props.email)
    if (user.loginTries <= 5 && !user.signedIn) {
      const isMatch = encryptionService.compare(props.password, user.password)
      if (isMatch) {
        user.loginTries = 0
        user.signedIn = true
        this.repository.save(user)
        const timestamp = new Date().getTime()

        return `JWT${encode({
            user_id: user.id,
            email: user.email,
            pass: user.password,
            iat: timestamp
          }, _ENV_.SESSION_SECRET, 'HS512')}`
      } else {
        user.loginTries = user.loginTries + 1
        user.signedIn = false
        this.repository.save(user)
        return
      }
    }
  }

  public getOneByToken(token: string): any {
    this.repository.createQueryBuilder('user').where('user.eailConfirmationToken = :t', { t: token }).getOne()
  }

  public getOneByEmail(email: string): any {
    return this.repository.createQueryBuilder('user').where('user.email = :em', { em: email }).getOne()
  }

  public logout(user: IUser): void {
    user.signedIn = user.signedIn ? false : false
    this.repository.save(user)
  }

  public update(id: string, props: IUser): Promise<void> {
    return this.repository.updateById(id, props)
  }

  public delete(id: string): Promise<void> {
    return this.repository.removeById(id)
  }
}
