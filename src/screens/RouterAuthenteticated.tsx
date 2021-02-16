import React from 'react'
import ContactCreate from './ContactCreate'
import ContactList from './ContactList'
import { css } from '@emotion/css'
import { observer } from 'mobx-react-lite'
import { SaveOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { Link, Route, Switch } from 'react-router-dom'
import ContactView from './ContactView'
import { useStore } from '../stores/rootContext'

const RouterAuthenteticated = () => {
  const {
    contactsStore: { saveToFile, exit }
  } = useStore()

  const onSave = async () => {
    await saveToFile()
    Modal.info({
      title: 'File was saved'
    })
  }

  return (
    <>
      <div  className={css`display: flex; justify-content: space-between; margin-bottom: 10px;`}>

        <Button ghost type="primary" onClick={onSave} size="large" icon={<SaveOutlined />}>Save</Button>
        <Button danger ghost onClick={exit} size="large" icon={<SaveOutlined />}>Exit</Button>
      </div>
      <div className={css`display: flex;`}>
        <ContactList className={css`width: 230px; max-width: 240px;`}/>
        <div className={css`width: 20px;`}/>
        <div className={css`width: 100%;`}>
          <Switch>
            <Route path="/create" render={() => <ContactCreate/>}></Route>
            <Route path="/:id/edit" render={() => <ContactCreate/>}></Route>
            <Route path="/:id" render={() => <ContactView/>}></Route>
            <Route render={() => (
              <div>
                Select a contact or <Link to={'/create'}>create</Link> a new one
              </div>
            )}></Route>

          </Switch>
        </div>
      </div>
    </>
  )
}
export default observer(RouterAuthenteticated)
