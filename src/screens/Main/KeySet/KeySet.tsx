import { css } from '@emotion/css'
import { Form, Input, Button } from 'antd'
import React from 'react'
import { useStore } from '../../../stores/rootContext'


type PropsForm =  React.ComponentProps<typeof Form>
const KeySet = ({
  className=''
}: {
  className?: string
}): React.ReactElement => {
  const {
    contactsStore: { createEncKey }
  } = useStore()
  
  const [form] = Form.useForm()

  const onFinish = ({password}: {
    password: string
  }) => {
    createEncKey(password)
  }

  return (
    <Form className={className} layout="vertical"  name="control-hooks" form={form} onFinish={onFinish}>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input type="password"/>
      </Form.Item>
      <Form.Item name="confirmPassword" label="Confirm password" rules={[{ required: true }]}>
        <Input type="password"/>
      </Form.Item>
   
      <div className={css`display: flex; justify-content: flex-end;`}>
        <Button htmlType="submit" ghost type="primary" >
          Enter
        </Button>
      </div>
    </Form>
  )
}


export default KeySet
