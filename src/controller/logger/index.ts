import { Container } from 'typedi'
import { Logger as WinstonLogger } from './Logger'

export function Logger(scope: string): any {
    return (object: any, propertyName: string, index?: number): any => {
        const logger = new WinstonLogger(scope)
        Container.registerHandler({ object, propertyName, index, value: () => logger })
    }
}

export { ILogger } from './logger.interface'
