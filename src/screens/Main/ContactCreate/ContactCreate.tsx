import { css } from '@emotion/css'
import { Form, Input, Button } from 'antd'
import React from 'react'
import { useStore } from '../../../stores/rootContext'


type PropsForm =  React.ComponentProps<typeof Form>
const ContactCreate = ({
  className=''
}: {
  className?: string
}): React.ReactElement => {
  const {
    contactsStore: { create }
  } = useStore()
  
  const [form] = Form.useForm()

  const onFinish = (values: {
    name: string
    phone: string
    email: string
    address: string
  }) => {

    create(values)
  }

  return (
    <Form className={className} layout="vertical"  name="control-hooks" form={form} onFinish={onFinish}>
      <Form.Item name="name" label="Contact name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="address" label="Address" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
   
      <div className={css`display: flex; justify-content: flex-end;`}>
        <Button htmlType="submit" ghost type="primary" >
          Submit
        </Button>
      </div>
    </Form>
  )
}


export default ContactCreate
