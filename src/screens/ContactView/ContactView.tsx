import { css } from '@emotion/css'
import { Form } from 'antd'
import React from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useStore } from '../../stores/rootContext'

type PropsForm =  React.ComponentProps<typeof Form>
const ContactView = (): React.ReactElement => {
  const {
    contactsStore: { getById }
  } = useStore()
  const { id } = useParams<{id: string}>()
  const contact = getById(id)

  if(!contact){
    return <Redirect to="/"/>
  }
  return (
    <p>
      name: {contact.name} <br/>
      email: {contact.email} <br/>
      phone: {contact.phone} <br/>
      address: {contact.address} <br/>
      id: <small className={css`font-size: 9px;`}>{contact.id} </small>
    </p>

  )
}

export default ContactView
