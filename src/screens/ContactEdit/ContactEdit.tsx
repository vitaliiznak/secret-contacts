import { css } from '@emotion/css'
import { Form, Input, Button, Typography } from 'antd'
import React from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { useStore } from '../../stores/rootContext'

const { Text } = Typography
type PropsForm =  React.ComponentProps<typeof Form>
const ContactCreate = ({
  className=''
}: {
  className?: string
}): React.ReactElement => {
  const {
    contactsStore: { getById, update }
  } = useStore()
  const history = useHistory()
  const { id } = useParams<{id: string}>()
  const contact = getById(id)
  const [form] = Form.useForm()

  const onFinish = (values: {
    name: string
    phone: string
    email: string
    address: string
  }) => {
    const contact = update(id, values)
    history.push(`/${contact.id}`)
  }

  if(!contact){
    return <Redirect to="/"/>
  }

  return (
    <Form
      className={className}
      layout="vertical"
      form={form}
      onFinish={onFinish}
      initialValues={{
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        address: contact.address
      }}>
      <Form.Item name="name" label="Contact name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true }, {type: 'email'}]}>
        <Input />
      </Form.Item>
      <Form.Item name="address" label="Address" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Text type="secondary">id: <small className={css`font-size: 9px;`}>{contact.id} </small></Text>
      <div className={css`display: flex; justify-content: flex-end;`}>
        <Button htmlType="submit" ghost type="primary" >
          Update
        </Button>
      </div>
    </Form>
  )
}


export default ContactCreate
