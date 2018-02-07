import * as Faker from 'faker'
import { ObjectType } from 'typeorm'
import { IEntityFactoryInterface } from './EntityFactoryInterface'
import { Connection } from 'typeorm/connection/Connection'
import { ISeedsConstructorInterface } from './SeedsInterface'

export interface IFactoryInterface {
    getConnection(): Connection
    setConnection(connection: Connection): void
    runSeed<T>(seedClass: ISeedsConstructorInterface): Promise<T>
    get<Entity>(entityClass: ObjectType<Entity>, value?: any): IEntityFactoryInterface<Entity>
    define<Entity>(entityClass: ObjectType<Entity>, fakerFunction: (faker: typeof Faker, value?: any) => Entity): void
}
