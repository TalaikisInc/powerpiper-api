import 'reflect-metadata'
import { Connection } from 'typeorm'
import { Factory } from './Factory'

export const getFactory = (connection: Connection) => {
    const factory = Factory.getInstance()
    factory.setConnection(connection)
    return factory
}

export * from './Factory'
export * from './SeedsInterface'
export * from './FactoryInterface'
