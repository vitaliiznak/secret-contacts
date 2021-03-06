import React from 'react'
import { css } from '@emotion/css'
import { observer } from 'mobx-react-lite'
import { SaveOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { Link, Route, Switch } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import ContactCreate from './ContactCreate'
import ContactList from './ContactList'
import ContactView from './ContactView'
import ContactEdit from './ContactEdit'
import { useStore } from '../stores/rootContext'

const { confirm } = Modal

const RouterAuthenteticated = () => {
  const {
    contactsStore: { saveToFile, exit }
  } = useStore()

  const onExit = () => {
    confirm({
      title: 'Do you want to save changes?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Save & exit',
      cancelText: 'Exit',
      onOk() {
        exit(true)
      },
      onCancel() {
        exit()
      }
    })
  }

  const onSave = async () => {
    await saveToFile()
    Modal.info({
      title: 'File was saved'
    })
  }

  return (
    <>
      <div  className={css`display: flex; justify-content: space-between; margin-bottom: 10px;`}>
        <Button danger ghost onClick={onExit} size="large" icon={<SaveOutlined />}>Exit</Button>
        <Button ghost type="primary" onClick={onSave} size="large" icon={<SaveOutlined />}>Save</Button>
      </div>
      <div className={css`display: flex;`}>
        <ContactList className={css`width: 250px; max-width: 270px;`}/>
        <div className={css`width: 20px;`}/>
        <div className={css`width: 100%;`}>
          <Switch>
            <Route path="/create" render={() => <ContactCreate/>}></Route>
            <Route path="/:id/edit" render={() => <ContactEdit/>}></Route>
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
