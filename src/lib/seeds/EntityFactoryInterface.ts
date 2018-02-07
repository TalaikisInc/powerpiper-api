import * as Faker from 'faker'

export interface IEntityFactoryInterface<Entity> {
    make(): Promise<Entity>
    makeMany(amount: number): Promise<Entity[]>
    create(): Promise<Entity>
    createMany(amount: number): Promise<Entity[]>
    each(iterator: (entity: Entity, faker: typeof Faker) => Promise<any>): IEntityFactoryInterface<Entity>
}
