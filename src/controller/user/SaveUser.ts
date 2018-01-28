import { getManager } from 'typeorm'
import { User } from '../../entity/user'

export async function SaveUser(email: string, password: string) {

    const userRepository = await getManager().getRepository(User)

    const user = new User()
    user.email = email
    // its is hashed by Model event listener
    user.password = password

    userRepository.save(user)

    return user

}
