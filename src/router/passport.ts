const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

import { User } from '../entity/user'
import { GetUserById } from '../controller/user/GetUserById'
import _ENV_ from '../config'

// check iof jwt matches user
module.exports = (passport: any) => {
  const opts = { jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'), secretOrKey: _ENV_.SESSION_SECRET }
  passport.use(new JwtStrategy(opts, (jwtPayload: any, done: any) => {
    GetUserById(jwtPayload)
    .then((user) => {
      if (!user) {
        return done('JWT auth error', false)
      }

      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  }))
}
