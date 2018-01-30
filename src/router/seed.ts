import { Router, Request, Response, NextFunction } from 'express'

import { UserSeed } from '../controller/seed/UserSeed'
import { RoleSeed } from '../controller/seed/RoleSeed'
import { CountrySeed } from '../controller/seed/CountrySeed'
import { PostSeed } from '../controller/seed/PostSeed'
import { CategorySeed } from '../controller/seed/CategorySeed'
import { PageSeed } from '../controller/seed/PageSeed'
import _ENV_ from '../config'

export class SeedRouter {

  public router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  public init() {
    if (process.env.NODE_ENV === 'development') {
      // allow those only in development
      this.router.get('/user', UserSeed),
      this.router.get('/post', PostSeed),
      this.router.get('/category', CategorySeed)

      // seed initial required info
      this.router.get('/role', RoleSeed),
      this.router.get('/country', CountrySeed),
      this.router.get('/page', PageSeed)
    }
  }

}

const seedRoutes = new SeedRouter()
seedRoutes.init()

export default seedRoutes.router
