import { Request, Response } from 'express'
import { getManager } from 'typeorm'

import { User } from '../../entity/user'

export async function UserSeed(request: Request, response: Response) {

    const userRepository = await getManager().getRepository(User)
    const password = 'test1'

    const user = new User()
    user.firstName = 'Black'
    user.lastName = 'Mirror'
    user.email = 'crooked.wilow@test.com'

    userRepository.save(user)

    const users = await userRepository.find()

    response.send(users)
}
