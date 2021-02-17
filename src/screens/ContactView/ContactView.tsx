import { css } from '@emotion/css'
import { Button, Form, Space, Typography } from 'antd'
import React from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { useStore } from '../../stores/rootContext'

const { Text } = Typography
type PropsForm =  React.ComponentProps<typeof Form>
const ContactView = (): React.ReactElement => {
  const {
    contactsStore: { getById }
  } = useStore()
  const history = useHistory()
  const { id } = useParams<{id: string}>()
  const contact = getById(id)

  if(!contact){
    return <Redirect to="/"/>
  }
  return (
    <>
      <div className={css`margin-bottom: 8px;`}>
        <Space direction="vertical">
          <Text type="secondary"> name: {contact.name}</Text>
          <Text type="secondary"> email: {contact.email} <br/></Text>
          <Text type="secondary"> phone: {contact.phone} <br/></Text>
          <Text type="secondary"> address: {contact.address} <br/></Text>
          <Text type="secondary">id: <small className={css`font-size: 9px;`}>{contact.id} </small></Text>
        </Space>
      </div>
      <Button ghost type="primary"  onClick={()=> history.push(`${id}/edit`)}>Edit</Button>
    </>
  )
}

export default ContactView
