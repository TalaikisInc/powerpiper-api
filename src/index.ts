import 'reflect-metadata'
import _ENV_ from './config'

import { createConnection, useContainer } from 'typeorm'
import { Container } from 'typedi'
import chalk from 'chalk'
import { createExpressServer } from 'routing-controllers'
import { User } from './entity/user'
import { Post } from './entity/post'
import { Category } from './entity/category'
import { Rank } from './entity/rank'
import { Country } from './entity/country'
import { Page } from './entity/page'
import { UserController } from './controller/user'

useContainer(Container)

createConnection({
    type: 'postgres',
    host: _ENV_.DATABASE_HOST,
    port: _ENV_.DATABASE_PORT,
    username: _ENV_.DATABASE_USER,
    password: _ENV_.DATABASE_PASSWORD,
    database: _ENV_.DATABASE_NAME,
    entities: [
        User,
        Post,
        Page,
        Rank,
        Country,
        Category
    ],
    synchronize: true,
    logging: true
})
  .then(async (connection: any) => {
    console.log(chalk.green('Connected to Postgres.'))
    createExpressServer({
        controllers: [
            UserController
        ]
    }).listen(_ENV_.API_PORT)
    console.log(chalk.magenta(`Server is up and running on port ${_ENV_.API_PORT}.`))
    })
  .catch((error: any) => console.log(chalk.red(error)))
