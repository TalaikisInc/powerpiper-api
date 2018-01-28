import { getManager } from 'typeorm'
import { User } from '../../entity/user'

export async function GetUserByEmail(email: string) {

    const userRepository = await getManager().getRepository(User)

    const user = await userRepository
      .createQueryBuilder('user')
      .where('user.email = :e', { e: email })

    return user
}
