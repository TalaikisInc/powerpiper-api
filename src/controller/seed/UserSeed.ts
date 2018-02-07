import { ISeedsInterface, IFactoryInterface } from '../../lib/seeds'
import { User } from '../../entity/user'

export class UserSeed implements ISeedsInterface {

    public async seed(factory: IFactoryInterface): Promise<any> {
        await factory
            .get(User)
            .createMany(100)
    }
}
