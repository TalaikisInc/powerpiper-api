import { compare, genSalt, hash } from 'bcrypt'
import * as uuid from 'uuid/v4'
import { randomBytes, createCipher, createDecipher } from 'crypto'

import _ENV_ from '../config'
const algorithm = 'aes-256-ctr'
const password = _ENV_.CRYPT_KEY

export class EncryptionService {

  public generateSalt(): Promise<string> {
    return genSalt()
  }

  public hash(input: string, salt: string): Promise<string> {
    return hash(input, salt)
  }

  public compare(input: string, hashed: string): Promise<boolean> {
    return compare(input, hashed)
  }

  public token(): string {
    return uuid()
  }

  public generateKey(): string {
    const pass = randomBytes(128)
    const passBase64 = pass.toString('base64')
    return passBase64
  }

  public encrypt(text: string): string {
      const cipher = createCipher(algorithm, password)
      let crypted = cipher.update(text, 'utf8', 'hex')
      crypted += cipher.final('hex')
      return crypted
    }

    public decrypt(text: string): string {
    const decipher = createDecipher(algorithm, password)
    let dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8')
    return dec
  }

}

export const encryptionService: EncryptionService = new EncryptionService()
