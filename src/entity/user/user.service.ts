import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { OrmRepository } from 'typeorm-typedi-extensions'

import { IUser } from './user.interface'
import { User } from './user.model'

// To protect user info, don't expose passwords and tokens to the API in *any* way, job shoulf be done server side only
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

  public create(props: IUser) {
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

  public getOne(id: string) {
    return this.repository.findOneById(id)
  }

  public update(id: string, props: IUser): Promise<void> {
    return this.repository.updateById(id, props)
  }

  public delete(id: string): Promise<void> {
    return this.repository.removeById(id)
  }
}
