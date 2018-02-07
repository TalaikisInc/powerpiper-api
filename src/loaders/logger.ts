import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework-w3tec'
import * as winston from 'winston'

import _ENV_ from '../config'

export const loggerLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    winston.configure({
        transports: [
            new winston.transports.Console({
                level: _ENV_.LOG_LEVEL,
                handleExceptions: true,
                json: _ENV_.LOG_JSON,
                timestamp: _ENV_.LOG_TIMESTAMP,
                colorize: _ENV_.LOG_COLORIZE
            })
        ]
    })
}
