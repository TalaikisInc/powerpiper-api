import * as Faker from 'faker'
import { Factory } from '../../../lib/seeds'

import { User } from '../../../entity/user'
import { encryptionService } from '../../../services'

const factory = Factory.getInstance()

factory.define(User, (faker: typeof Faker) => {

    const gender = faker.random.number(1)
    const firstName = faker.name.firstName(gender)
    const lastName = faker.name.lastName(gender)
    const email = faker.internet.email(firstName, lastName)
    // const salt = encryptionService.generateSalt().then((s) => user.salt = s)

    const user = new User()
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    //user.salt = salt
    encryptionService.generateSalt().then((s: string) => user.salt = s)
    user.emailAccessToken = encryptionService.token()
    encryptionService.hash(`${email}${lastName}`, user.salt).then((p: string) => user.password = p)

    return user
})
