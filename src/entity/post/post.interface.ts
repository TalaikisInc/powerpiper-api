import { IBase } from '../base'
import { User } from '../user'
import { Category } from '../category'

// Should define Base attributes for access inside controller fo srvice
export interface IPost extends IBase {
    title: string
    slug: string
    image: string
    content: string
    categories: Category[]
    authors: User[]
}
