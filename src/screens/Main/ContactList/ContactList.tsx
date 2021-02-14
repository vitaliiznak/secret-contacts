import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../../stores/rootContext'

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]

const ContactList = ({className = ''}: {
  className?: string
}): React.ReactElement => {
  const {
    contactsStore: { contacts }
  } = useStore()

  return (
    <List
      className={className}
      size="small"
      header={<div>Contacts</div>}
      bordered
      dataSource={contacts.map(({name}) => name)}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
  )
}


export default observer(ContactList)
