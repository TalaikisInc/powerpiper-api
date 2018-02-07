import { Action } from 'routing-controllers'
import { Container } from 'typedi'

import { AuthService } from './auth.service'
import { Logger } from '../logger'
import { User, IUser } from '../../entity/user'

export function authorizationChecker():
  (action: Action, roles: any[]) => Promise<boolean> | boolean {

    const log = Logger(__filename)
    const authService = Container.get<AuthService>(AuthService)

    return async function innerAuthorizationChecker(action: Action, roles: string[]): Promise<boolean> {
        const token = authService.parseTokenFromRequest(action.request)

        if (token === undefined) {
            log.warn('No token given')
            return false
        }

        // Request user info at with the provided token
        try {
            action.request.tokeninfo = await authService.getTokenInfo(token)
            log.info('Successfully checked token')
            return true
        } catch (e) {
            log.warn(e)
            return false
        }
    }
}
