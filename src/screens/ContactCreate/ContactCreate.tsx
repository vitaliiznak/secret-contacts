import { css } from '@emotion/css'
import { Form, Input, Button } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useStore } from '../../stores/rootContext'


type PropsForm =  React.ComponentProps<typeof Form>
const ContactCreate = ({
  className=''
}: {
  className?: string
}): React.ReactElement => {
  const {
    contactsStore: { create }
  } = useStore()
  const history = useHistory()

  const [form] = Form.useForm()

  const onFinish = (values: {
    name: string
    phone: string
    email: string
    address: string
  }) => {
    const newContact = create(values)
    history.push(`/${newContact.id}`)
  }

  return (
    <Form className={className} layout="vertical"  name="control-hooks" form={form} onFinish={onFinish}>
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

      <div className={css`display: flex; justify-content: flex-end;`}>
        <Button htmlType="submit" ghost type="primary" >
          Add
        </Button>
      </div>
    </Form>
  )
}


export default ContactCreate
