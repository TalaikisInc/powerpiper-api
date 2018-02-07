import { IBase } from '../base'

// Should define Base attributes for access inside controller fo srvice
export interface IPage extends IBase {
    title: string
    slug: string
    content: string

}
