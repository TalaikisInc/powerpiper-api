import * as bcrypt from 'bcrypt'
import * as uuid from 'uuid/v4'
import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { User } from '../../entity/user'
import _ENV_ from '../../config'

export async function UserController(request: Request, response: Response) {

    const userRepository = await getManager().getRepository(User)
    const emailAccessToken = uuid()
    const password = 'test1'
    const salt = bcrypt.genSaltSync(10)
    const hashed = bcrypt.hashSync(password, salt)

    const user = new User()
    user.firstName = 'Black'
    user.lastName = 'Mirror'
    user.email = 'crooked.wilow@test.com'
    user.emailAccessToken = emailAccessToken
    user.password = hashed
    user.salt = salt
    userRepository.save(user)

    const users = await userRepository.find()

    response.send(users)
}
