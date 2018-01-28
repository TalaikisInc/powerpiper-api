import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { User } from '../entity/user'

export async function GetUserController(request: Request, response: Response) {

    const userRepository = await getManager().getRepository(User)

    const user = await userRepository.findOneById(request.params.id)

    if (!user) {
        response.status(404)
        response.end()
        return
    }

    response.send(user)
}
