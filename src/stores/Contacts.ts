import { action, makeObservable, observable, toJS } from 'mobx'
import { v4 as uuidv4 } from 'uuid'
import * as crypto from 'crypto'
import * as util from 'util'
import Root from './Root'

const scryptP = util.promisify(crypto.scrypt)
console.log('scryptP', scryptP)

export default class Contacts {
  public root: Root;

  public filePath?: string | null;

  public encKey?: string;

  constructor(root: Root) {
    this.root = root
    makeObservable(this, {
      filePath: observable,
      encKey: observable,
    })
  }

  contacts: Array<{
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
  }> = observable([]);

  public enter = action((filePath: string | null | undefined) => {
    console.log('store filePath', filePath)
    this.filePath = filePath
    console.log(' this.filePath', this.filePath)
  });

  public create = action(
    (values: {
      name: string;
      phone: string;
      email: string;
      address: string;
    }): void => {
      this.contacts.push({
        id: uuidv4(),
        ...values,
      })
    }
  );

  public createEncKey = action(async (password: string) => {
    console.log('password', password)
    try {
      this.encKey = (await scryptP(password, 'SOME_SALT', 2)) as string
      console.log('encKey', this.encKey)
    } catch (err) {
      console.log(err)
    }
  });

  public logout = () => {
    console.info('user had been loged out')
    window.location.href = '/'
  };

  public init = async () => {
    console.log('init')
  };
}
