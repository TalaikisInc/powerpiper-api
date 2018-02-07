import 'reflect-metadata'
import { bootstrapMicroframework } from 'microframework-w3tec'
import Chalk from 'chalk'
import _ENV_ from './config'

import { Logger } from './controller/logger'
const log = Logger(__filename)

import { containerLoader, expressLoader, loggerLoader, typeormLoader } from './loaders'

bootstrapMicroframework({
    loaders: [
        loggerLoader,
        containerLoader,
        typeormLoader,
        expressLoader
    ]
})
    .then(() => console.log(Chalk.green(`Server is up and running on port ${_ENV_.API_PORT}.`)))
    //.catch((err) => log.error(Chalk.red(err)))
