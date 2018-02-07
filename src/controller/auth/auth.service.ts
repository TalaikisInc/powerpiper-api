import { Service } from 'typedi'
import { Request } from 'express'
import { Req } from 'routing-controllers'
import { decode } from 'jwt-simple'

import { Logger, ILogger } from '../logger'
import { User, IUser } from '../../entity/user'
import _ENV_ from '../../config'

@Service()
export class AuthService {

    public parseTokenFromRequest(@Req() req: Request): string | undefined {
        const authorization = req.header('authorization')
        const log = Logger(__filename)

        // Retrieve the token form the Authorization header
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            log.info('Token provided by the client')
            return authorization.split(' ')[1]
        }

        log.info('No Token provided by the client')

        return
    }

    public getTokenInfo(token: string): Promise<IUser> {
        const tokenData = decode(token, _ENV_.SESSION_SECRET)
        console.log(tokenData)
        console.log('-------------')
        const tokeninfo = JSON.parse(tokenData)
        console.log(tokeninfo)
        console.log('-------------')
        return tokeninfo
    }
}
