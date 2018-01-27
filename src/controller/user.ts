import { JsonController, Get, Post } from 'routing-controllers'
import { getConnectionManager, Repository } from 'typeorm'
import { EntityFromParam, EntityFromBody } from 'typeorm-routing-controllers-extensions'
import { User } from '../entity/user'

@JsonController()
export class UserController {

    private userRepository: Repository<User>

    constructor() {
        this.userRepository = getConnectionManager().get().getRepository(User)
    }

    @Get('/users/:id')
    public get(@EntityFromParam('id') user: User) {
        return user
    }

    @Post('/users')
    public save(@EntityFromBody() user: User) {
        return this.userRepository.save(user)
    }
}
