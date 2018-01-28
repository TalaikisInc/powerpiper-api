import { Router, Request, Response, NextFunction } from 'express'
import { Validator } from 'class-validator'
import { getManager } from 'typeorm'
import * as jwt from 'jwt-simple'
import * as bcrypt from 'bcrypt'
const validator = new Validator()
import _ENV_ from '../config'
import { User } from '../entity/user'
import { GetUserByEmail } from '../controller/user/GetUserByEmail'
import { SaveUser } from '../controller/user/SaveUser'

// @ TODO
// import { UpdateUser } from '../controller/user/UpdateUser'
// import { DeleteUser } from '../controller/user/DeleteUser'

export class UserRouter {

  private static userData(user: User): object {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lasName,
      birthDate: user.birthDate,
      street: user.street,
      state: user.state,
      roles: user.roles,
      isAdmin: user.isAdmin,
      isStaff: user.isStaff,
      ethAddress: user.ethAddress,
      emailVerified: user.emailVerified,
      linkedWithFacebook: user.linkedWithFacebook,
      linkedWithTwitter: user.linkedWithTwitter,
      linkedWithGoogle: user.linkedWithGoogle,
      linkedWithLinkedin: user.linkedWithLinkedin
    }
  }

  public router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  // cretae user
  public create(req: Request, res: Response, next: NextFunction): void {

    const email = req.body.email
    const password = req.body.password

    const errors: object[] = []

    // Check email
    if (!email) {
      errors.push({
        title: 'Attribute is missing',
        details: 'No email specified'
      })
    } else {
      // if email valdiation fails
      if (!validator.isEmail(email)){
        errors.push({
          title: 'Invalide attribute',
          details: 'Email must have an email format'
        })
      }
    }

    // Check password
    if (!password){
      errors.push({
        title: 'Attribute is missing',
        details: 'No password specified'
      })
    } else {
      if (password.length < 12) {
        errors.push({
          title: 'Invalid attribute',
          details: 'Password must contain at least 12 random characters'
        })
      }
    }

    if (errors.length > 0){
      res.status(403).send({
        err: errors
      })
    } else {
      SaveUser(email, password)

      .then((user: User) => {
        res.status(201).send({
          data: {
            type: 'users',
            id: user.id,
            attributes: {
              email: user.email
            },
            token: `JWT${jwt.encode(UserRouter.userData(user), _ENV_.SESSION_SECRET, 'HS512')}`
          }
        })
      })
      // Send email
      .catch((err: object) => {
        res.status(400).send({
          errors: [{
            title: 'Cannot create user',
            details: err
          }]
        })
      })
    }
  }

  // Signin
  public findByEmail(req: Request, res: Response, next: NextFunction): void {

    const email = req.body.email
    const password = req.body.password
    const errors: object[] = []

    // Check email
    if (!email) {
      errors.push({
        title: 'Attribute is missing',
        details: 'No email specified'
      })
    } else {
      // if email validation fails
      if (!validator.isEmail(email)) {
        errors.push({
          title: 'Invalid attribute',
          details: 'Email must have an email format'
        })
      }
    }

    // Check password
    if (!password) {
      errors.push({
        title: 'Attribute is missing',
        details: 'No password specified'
      })
    } else {
      if (password.length < 12) {
        errors.push({
          title: 'Invalid attribute',
          details: 'Password must contain at least 12 characters'
        })
      }
    }

    // If at least one error
    if (errors.length > 0) {
      res.status(403).send({
        err: errors
      })
    } else {
      GetUserByEmail(email)
      .then((users: User[]) => {
        if (users.length > 0) {
          const user = users[0]
          bcrypt.compare(password, user.password, (err, isMatch) => {

            if (err) {
              errors.push({
                title: 'Cannot login',
                details: 'Error comparing password'
              })
            }

            if (!isMatch) {
              errors.push({
                title: 'Cannot login',
                details: 'The password is wrong.'
              })
            }

            if (errors.length > 0){
              res.status(400).send({
                err: errors
              })
            } else {
              res.status(201).send({
                data: {
                  type: 'users',
                  id: user.id,
                  attributes: {
                    email: user.email
                  },
                  token: `JWT${jwt.encode(UserRouter.userData(user), _ENV_.SESSION_SECRET, 'HS512')}`
                }
              })
            }
          })
        } else {
          res.status(400).send({
            errors: [{
              title: 'Invalid attribute',
              details: 'This email/ user does not exist'
            }]
          })
        }
      })
    }
  }

  public init() {
    this.router.post('/register', this.create)
    this.router.post('/login', this.findByEmail)
  }
}

// Create the UserRouter, and export its configured Express.Router.
const userRoutes = new UserRouter()
userRoutes.init()

export default userRoutes.router
