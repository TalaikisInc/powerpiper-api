import { getManager } from 'typeorm'
import { User } from '../../entity/user'

export async function GetUserById(id: number) {

    const userRepository = await getManager().getRepository(User)

    const user = await userRepository
      .createQueryBuilder('user')
      .where('user.id = :i', { i: id })

    return user
}
