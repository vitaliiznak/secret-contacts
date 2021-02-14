import { configure, observable, runInAction } from 'mobx'
import Contacts from './Contacts'

configure({
  enforceActions: 'always'
})
export class Root {
  @observable public ready = false

  public stores = {
    rootStore: this,
    contactsStore: new Contacts(this)
  }

  public init = async () => {
    await this.stores.contactsStore.init()
    await Promise.all([])
    runInAction(() => {
      this.ready = true
    })
  }
}

export default Root