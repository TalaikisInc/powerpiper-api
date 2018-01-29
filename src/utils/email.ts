import * as smtpTransport from 'nodemailer-smtp-transport'
import * as directTransport from 'nodemailer-direct-transport'
import * as nodemailer from 'nodemailer'
import chalk from 'chalk'

import _ENV_ from '../config'

export default async function sendVerificationEmail(toEmail: string, token: string) {

  let mailserver: any = directTransport({ name: _ENV_.EMAIL_SERVER })

  const verificationUrl = `${_ENV_.BASE_URL}/auth/email/signin/${token}`

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

  await nodemailer
    .createTransport(mailserver)
    .sendMail({
      to: toEmail,
      from: _ENV_.FROM_EMAIL_ADDRESS,
      subject: 'Verify account of PowerPiper',
      text: `Use the link provided below to sign in to site:\n\n${verificationUrl}\n\n`
    }, (err) => {
      // @TODO Handle errors
      if (err) {
        console.error(chalk.red(`Error sending email to ${toEmail} wioth error: ${err}`))
      }
    })
}