import { Entity } from 'typeorm'
import { Content } from './abstract/content'

@Entity()
export class Page extends Content {
}
