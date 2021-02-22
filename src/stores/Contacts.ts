import { action, makeObservable, observable, toJS } from 'mobx'
import { v4 as uuidv4 } from 'uuid'
import * as crypto from 'crypto'
import * as fs from 'fs'
import Root from './Root'

import { scryptSync } from 'crypto'

export default class Contacts {
  public filePath?: string | null;
  public activeContactId?: string;
  public contacts: Array<{
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
  }> = observable.array([]);
  constructor(root: Root) {
    this.root = root
    makeObservable(this, {
      filePath: observable,
      activeContactId: observable,
      contacts: observable
    })
  }
  public root: Root;
  public encKey?: Buffer;
  public salt?: Buffer;


  public enter = action(async ({ password, filepath, isNew }: { password: string, filepath: string, isNew: boolean }) => {
    if (!isNew) {
      const fileBuffer = fs.readFileSync(filepath)
      const oldSalt = fileBuffer.slice(0, 16)
      const oldEncKey = scryptSync(password, oldSalt, 24)
      const content = this.decrypt(
        fileBuffer.slice(16 + 16, fileBuffer.length),
        oldEncKey,
        fileBuffer.slice(16, 16 + 16))
      const contentObject = JSON.parse(content.toString('utf-8'))
      if (Array.isArray(contentObject)) { ///refactor structural pattern
        this.contacts = contentObject
      }
    }
    this.salt = crypto.randomBytes(16)
    this.encKey = scryptSync(password, this.salt, 24)
    this.filePath = filepath
  })

  public create = action(
    (values: {
      name: string;
      phone: string;
      email: string;
      address: string;
    }): {
      id: string
      name: string;
      phone: string;
      email: string;
      address: string;
    } => {
      const newContact = {
        id: uuidv4(),
        ...values,
      }
      this.contacts.push(newContact)
      return newContact
    }
  )

  public update = action((id: string, values: {
    name: string;
    phone: string;
    email: string;
    address: string;
  }): {
    id: string
    name: string;
    phone: string;
    email: string;
    address: string;
  } => {
    const indexToEdit = this.contacts.findIndex(({ id: recordId }) => id === recordId)
    if (indexToEdit < 0) {
      throw new Error(`Contact with id ${id} does not exist`)
    }
    this.contacts[indexToEdit] = { id, ...values }
    return this.contacts[indexToEdit]
  })

  public getById = (idArg: string): {
    id: string
    name: string;
    phone: string;
    email: string;
    address: string;
  } | null => {
    return this.contacts.find(({ id }) => id === idArg) || null
  }

  public exit = async (withSave?: boolean): Promise<void> => {
    if (withSave) {
      await this.saveToFile()
    }
    this.filePath = undefined
    this.encKey = undefined
    this.salt = undefined
    this.activeContactId = undefined
    this.contacts = observable.array([])
  };

  public init = async () => {
    console.info('init')
  };

  public saveToFile = async (): Promise<void> => {
    const errors = []
    if (!this.encKey) {
      errors.push('encKey is not provided')
    }
    if (!this.filePath) {
      errors.push('filePath is not provided')
    }
    if (!this.filePath) {
      errors.push('salt is not provided')
    }
    if (errors.length > 0) {
      throw Error(errors.join(';\n'))
    }

    const encryptedFinal = this.encrypt(JSON.stringify(this.contacts), this.encKey!)

    fs.writeFileSync(this.filePath!, Buffer.concat([this.salt!, encryptedFinal]))
  }

  /* Private functions */
  private encrypt = (data: Buffer | string, encKey: Buffer): Buffer => {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-192-cbc', encKey, iv)
    const encrypted = cipher.update(data)
    return Buffer.concat([iv, encrypted, cipher.final()])
  }


  private decrypt = ((encrypted: Buffer, encKey: Buffer, iv: Buffer) => {
    const decipher = crypto.createDecipheriv('aes-192-cbc', encKey, iv)
    const decrypted = decipher.update(encrypted)
    return Buffer.concat([decrypted, decipher.final()])
  });

}
