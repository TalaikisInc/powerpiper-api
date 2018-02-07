import chalk from 'chalk'
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers'

@Middleware({ type: 'after' })
export class UserErrorHandler implements ExpressErrorMiddlewareInterface {

    public error(error: any, request: any, response: any, next: (err: any) => any) {
        console.log(chalk.red(error))
        next(null)
    }
}
