import * as smtpTransport from 'nodemailer-smtp-transport'
import * as directTransport from 'nodemailer-direct-transport'
import _ENV_ from './config'

let mailserver: any = directTransport({ name: _ENV_.EMAIL_SERVER })

if (_ENV_.EMAIL_SERVER && _ENV_.EMAIL_USERNAME && _ENV_.EMAIL_PASSWORD) {
  mailserver = smtpTransport({
    host: _ENV_.EMAIL_SERVER,
    port: _ENV_.EMAIL_PORT,
    secure: _ENV_.EMAIL_SECURE,
    auth: {
      user: _ENV_.EMAIL_USERNAME,
      pass: _ENV_.EMAIL_PASSWORD
    },
    tls: {
      // do not fail on invalid certs
      // @ TODO
      rejectUnauthorized: false
    }
  })
}
