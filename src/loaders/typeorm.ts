import { createConnection } from 'typeorm';
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework-w3tec';

import _ENV_ from '../config'

export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {

    const connection = await createConnection({
        type: 'postgres',
        host: _ENV_.DATABASE_HOST,
        port: _ENV_.DATABASE_PORT,
        username: _ENV_.DATABASE_USER,
        password: _ENV_.DATABASE_PASSWORD,
        database: _ENV_.DATABASE_NAME,
        entities: ['src/entity/*.ts'],
        migrations: ['src/migration/*.ts'],
        synchronize: _ENV_.SYNC_DB,
        cli: {
            migrationsDir: 'migration'
        },
        logging: _ENV_.LOG_DB,
        cache: _ENV_.CACHE_DB
    })

    if (settings) {
        settings.setData('connection', connection)
        settings.onShutdown(() => connection.close())
    }
}
