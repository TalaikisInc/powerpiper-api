import 'reflect-metadata'
import * as express from 'express'
import * as cors from 'cors'
import * as lusca from 'lusca'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import { createConnection, useContainer } from 'typeorm'
import { Container } from 'typedi'
import chalk from 'chalk'
import { useContainer as routingContainer, useExpressServer } from 'routing-controllers'

import { User } from './entity/user'
import { Post } from './entity/post'
import { Category } from './entity/category'
import { Role } from './entity/role'
import { Country } from './entity/country'
import { Page } from './entity/page'
import { Request, Response } from 'express'
import _ENV_ from './config'
import SeedRouter from './router/seed'
import { PostController } from './controller/post'
import { UserController } from './controller/user'
import { UserErrorHandler } from './controller/user/error'

useContainer(Container)
routingContainer(Container)

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
        Role,
        Country,
        Category
    ],
    migrations: ['migration/*.js'],
    synchronize: _ENV_.SYNC_DB,
    cli: {
        migrationsDir: 'migration'
    },
    logging: _ENV_.LOG_DB,
    cache: true
})
  .then(async (connection: any) => {
    console.log(chalk.green('Connected to Postgres.'))

    const server = express()

    server.use(logger('dev'))

    server.use(cors({ origin: true, credentials: true }))

    server.use((req, res, next) => {
      res.header('Content-Type', 'application/vnd.api+json')
      next()
    })

    server.use(lusca())

    server.use(bodyParser.json())

    server.use(bodyParser.urlencoded({ extended: false }))

    const router = express.Router()

    server.use('/api/seed', SeedRouter)

    useExpressServer(server, {
      controllers: [
        UserController,
        PostController
      ],
      middlewares: [
        UserErrorHandler
      ],
      routePrefix: '/api/1.0',
      validation: true,
      defaultErrorHandler: false
    })

    server.listen(_ENV_.API_PORT)

    console.log(chalk.green(`Server is up and running on port ${_ENV_.API_PORT}.`))

    })
  .catch((error: any) => console.log(chalk.red(error)))
