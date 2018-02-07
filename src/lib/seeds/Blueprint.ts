import * as Faker from 'faker'
import { ObjectType } from 'typeorm'

export class BluePrint<Entity> {
    constructor(
        public EntityClass: ObjectType<Entity>,
        public create: (faker: typeof Faker, args: any[]) => Entity
    ) { }
}
