import { css } from '@emotion/css'
import { Button, List } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useStore } from '../../stores/rootContext'

const stylesContainer = css`
  overflow-y: auto;
  min-height:300px;
  max-height: 500px;
`
const ContactList = ({className = ''}: {
  className?: string
}): React.ReactElement => {
  const {
    contactsStore: { contacts }
  } = useStore()
  const history= useHistory()

  return (
    <List
      className={`${className} ${stylesContainer}`}
      size="small"
      header={<div className={css`display: flex;justify-content:space-between;`}>
        <span>Contacts</span>
        <Button
          onClick={()=> history.push('/create')}
          ghost
          type="primary">
          New
        </Button></div> }
      bordered
      dataSource={contacts}
      renderItem={({id, name, email}) => <List.Item className={css`width: 100%;display: block;`}>
        <Link to={`/${id}`} className={css`display: block; width: 100%;`}>
          <div>
            {name}
          </div>
          <span className={css`font-size: 8px;`}>
            {email}
          </span>
        </Link>
        <div className={css`width: 100%; border-bottom: 1px solid #cacaca;`}/>
      </List.Item>}
    />
  )
}

export default observer(ContactList)
