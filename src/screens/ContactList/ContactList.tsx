import { css } from '@emotion/css'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'
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

  return (
    <List
      className={`${className} ${stylesContainer}`}
      size="small"
      header={<div>Contacts</div>}
      bordered
      dataSource={contacts}
      renderItem={({id, name, email}) => <List.Item>
        <Link to={`/${id}`}>
          <div>
            {name}
          </div>
          <span className={css`font-size: 8px;`}>
            {email}
          </span>
          <div className={css`width: 100%; border-bottom: 1px solid #cacaca;`}/>
        </Link>
      </List.Item>}
    />
  )
}

export default observer(ContactList)
