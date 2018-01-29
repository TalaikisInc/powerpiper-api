import { Router, Request, Response, NextFunction } from 'express'

import { UserSeed } from '../controller/seed/UserSeed'
import { RoleSeed } from '../controller/seed/RoleSeed'
import { CountrySeed } from '../controller/seed/CountrySeed'
import { PostSeed } from '../controller/seed/PostSeed'
import { CategorySeed } from '../controller/seed/CategorySeed'

export class SeedRouter {

  public router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  public init() {
    this.router.get('/user', UserSeed),
    this.router.get('/post', PostSeed),
    this.router.get('/role', RoleSeed),
    this.router.get('/country', CountrySeed),
    this.router.get('/category', CategorySeed)
  }

}

const seedRoutes = new SeedRouter()
seedRoutes.init()

export default seedRoutes.router
