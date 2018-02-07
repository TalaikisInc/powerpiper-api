import * as path from 'path'
import { Application } from 'express'
import { createExpressServer } from 'routing-controllers'
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework-w3tec'
import * as lusca from 'lusca'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import { Request, Response } from 'express'

import { authorizationChecker } from '../controller/auth/authChecker'
import { currentUserChecker } from '../controller/auth/currentUserChecker'
import _ENV_ from '../config'

export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const connection = settings.getData('connection')

        const expressApp: Application = createExpressServer({
            cors: { origin: true, credentials: true },
            classTransformer: true,
            routePrefix: _ENV_.ROUTE_PREFIX,
            defaultErrorHandler: false,
            controllers: [path.join(__dirname, '..', 'src/controller/**/*{.js,.ts}')],
            middlewares: [path.join(__dirname, '..', 'src/middleware/*{.js,.ts}')],
            authorizationChecker: authorizationChecker(),
            currentUserChecker: currentUserChecker(connection),
            validation: true,
            defaults: {
                nullResultCode: 404,
                undefinedResultCode: 204,
                paramOptions: { required: true }
              }
        })

        expressApp.use(logger('dev'))

        expressApp.use((req: Request, res: Response, next) => {
            res.header('Content-Type', 'application/vnd.api+json')
            next()
        })

        expressApp.use(lusca())

        expressApp.use(bodyParser.json())

        expressApp.use(bodyParser.urlencoded({ extended: false }))

        const server = expressApp.listen(_ENV_.API_PORT)

        settings.setData('express_server', server)

        settings.setData('express_app', expressApp)
    }
}
