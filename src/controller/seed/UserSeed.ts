import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import * as uuid from 'uuid/v4'

import { encryptionService } from '../../services'
import { User } from '../../entity/user'

function generateSalt(): Promise<string> {
  return encryptionService
    .generateSalt()
    .then(
      (salt: string) => salt
    )
}

function hashPassword(password: string, salt: string): Promise<string> {
  return encryptionService
    .hash(password, salt)
    .then(
      (hash: string) => hash
    )
}

export async function UserSeed(request: Request, response: Response) {

    const userRepository = await getManager().getRepository(User)

    const user = new User()
    user.email = 'testdddd@test.com'
    user.emailAccessToken = uuid()
    user.salt = await generateSalt()
    const password = 'testdd passw'
    user.password = await hashPassword(password, user.salt)

    await userRepository.save(user)

    const users = await userRepository.find()

    response.send(users)
}
