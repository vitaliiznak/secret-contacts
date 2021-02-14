import React from 'react'
import ContactCreate from './ContactCreate'
import ContactList from './ContactList'
import { css } from '@emotion/css'
import { observer } from 'mobx-react-lite'
import { Button } from 'antd'

const Main = () => {
  return (
    <div>
      <Button>Save</Button>
      <div className={css`display: flex;`}>
        <ContactList className={css`width: 190px; max-width: 200px;`}/>
        <div  className={css`width: 20px;`}/>
        <ContactCreate className={css`width: 100%;`}/>
      </div>
    </div>
  )
}
export default observer(Main)
