import { Factory } from './Factory'

export interface ISeedsInterface {
    seed(factory: Factory): Promise<any>
}

export interface ISeedsConstructorInterface {
    new(): ISeedsInterface
}
