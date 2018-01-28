import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Role } from '../../entity/role'

export async function RoleController(request: Request, response: Response) {

    const roleRepository = await getManager().getRepository(Role)

    const role1 = new Role()
    role1.title = 'User'

    const role2 = new Role()
    role2.title = 'Seeker'

    const role3 = new Role()
    role3.title = 'Provider'

    roleRepository.save([role1, role2, role3])

    const roles = await roleRepository.find()

    response.send(roles)
}
