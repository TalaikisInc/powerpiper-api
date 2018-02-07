import { Container } from 'typedi'
import { useContainer as orm } from 'typeorm'
import { useContainer as routing } from 'routing-controllers'
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework-w3tec'

export const containerLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {

    routing(Container)
    orm(Container)

}
