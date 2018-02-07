import { Action } from 'routing-controllers'
import { Connection } from 'typeorm'
import { Container } from 'typedi'

import { AuthService } from './auth.service'
import { User } from '../../entity/user'
import { Logger } from '../logger'
import _ENV_ from '../../config'

export function currentUserChecker(connection: Connection): (action: Action) => Promise<User | undefined> {
    const log = Logger(__filename)
    const authService = Container.get<AuthService>(AuthService)

    return async function innerCurrentUserChecker(action: Action): Promise<User | undefined> {

        const token = authService.parseTokenFromRequest(action.request)

        if (token === undefined) {
            log.warn('No token given')
            return
        }

        const tokenInfo = await authService.getTokenInfo(token)
        const em = connection.createEntityManager()

        const user = await em.findOne<User>(User, {
            where: {
                email: tokenInfo.email
            }
        })

        if (user) {
            log.info('Current user is ', user.toString())
            return user
        } else {
            log.info('Current user is undefined')
            return
        }
    }
}
