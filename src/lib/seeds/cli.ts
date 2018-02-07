import 'reflect-metadata'
import * as path from 'path'
import * as glob from 'glob'
import * as commander from 'commander'
import Chalk from 'chalk'
import { Connection } from 'typeorm'
import { Factory } from './Factory'
import { getConnection } from './connection'

const runDir = process.cwd()

// Cli helper
commander
    .version('1.0.0')
    .description('Run database seeds')
    .option('--seeds <path>', 'add filepath for your seeds')
    .parse(process.argv)

const factoryPath = 'src/controller/seed/factory/'
const seedsPath = 'src/controller/seed/'

// Search for seeds and factories
glob(path.join(runDir, factoryPath, '**/*Factory{.js,.ts}'), (errFactories: any, factories: string[]) => {
    glob(path.join(runDir, seedsPath, '*{.js,.ts}'), (errSeeds: any, seeds: string[]) => {
        const log = console.log

        // Status logging to print out the amount of factories and seeds.
        log(Chalk.bold('seeds'))
        log('🔎 ', Chalk.gray.underline(`found:`),
            Chalk.blue.bold(`${factories.length} factories`,
            Chalk.gray('&'), Chalk.blue.bold(`${seeds.length} seeds`)))

        // Initialize all factories
        for (const factory of factories) {
            require(factory)
        }

        // Get typeorm database connection and pass them to the factory instance
        getConnection().then((connection: Connection) => {
            const factory = Factory.getInstance()
            factory.setConnection(connection)

            // Initialize and seed all seeds.
            const queue: Array<Promise<void>> = [];
            for (const seed of seeds) {
                try {
                    const seedFile: any = require(seed)
                    let className = seed.split('/')[seed.split('/').length - 1]
                    className = className.replace('.ts', '').replace('.js', '')
                    className = className.split('-')[className.split('-').length - 1]
                    log('\n' + Chalk.gray.underline(`executing seed:  `), Chalk.green.bold(`${className}`))
                    queue.push((new seedFile[className]()).seed(factory))
                } catch (error) {
                    console.error('Could not run seed ' + seed, error)
                }
            }

            // Promise to catch the end for termination and logging
            Promise
                .all(queue)
                .then(() => {
                    log('\n👍 ', Chalk.gray.underline(`finished seeding`))
                    process.exit(0)
                })
                .catch((error) => {
                    console.error('Could not run seed ' + error)
                    process.exit(1)
                })

        }).catch((error) => {
            console.error('Could not connection to database ' + error)
            process.exit(1)
        })
    })
})
