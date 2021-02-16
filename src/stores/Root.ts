import { configure, observable, runInAction } from 'mobx'
import Contacts from './Contacts'

configure({
  enforceActions: 'always'
})
export class Root {


  public stores = {
    rootStore: this as Root,
    contactsStore: new Contacts(this)
  }

  public init = async (): Promise<void> => {
    await this.stores.contactsStore.init()
  }
}

export default Root
