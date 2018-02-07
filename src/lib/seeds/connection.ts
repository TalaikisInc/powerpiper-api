import { createConnection, Connection } from 'typeorm'

import _ENV_ from '../../config'

export const getConnection = async (): Promise<Connection> => {

    return await createConnection({
        type: 'postgres',
        host: _ENV_.DATABASE_HOST,
        port: _ENV_.DATABASE_PORT,
        username: _ENV_.DATABASE_USER,
        password: _ENV_.DATABASE_PASSWORD,
        database: _ENV_.DATABASE_NAME,
        entities: [
            'src/entity/**/*.ts'
        ],
        logging: _ENV_.LOG_DB
    })
}
