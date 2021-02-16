
import { css } from '@emotion/css'
import { Button, Form, Input, Modal, Radio, RadioChangeEvent } from 'antd'
import electron from 'electron'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import path from 'path'
import moment from 'moment'
import debounce from 'lodash.debounce'
import { useStore } from '../../stores/rootContext'

const { dialog } = electron.remote

type PropsForm =  React.ComponentProps<typeof Form>
const StorageChoose = ({className = ''}: {
  className?: string
}): React.ReactElement => {
  const {
    contactsStore: { enter }
  } = useStore()
  const [form] = Form.useForm()
  const [filePath, setFilePath] = useState('')

  const onFinish = ({password, fileSelection}: {
    fileSelection: string
    password: string
  }) => {
    if(!filePath.length) {
      form.setFields([ {
        name:'fileSelection',
        errors: ['Please choose or create a contact file']
      }])
    } else {
      enter({password, filepath: filePath, isNew: fileSelection === 'NEW' }).catch(err => {
        Modal.info({
          title: 'File or password invalid please try another one',
          onOk: () => {
            form.resetFields()
          }
        })
      })
    }
  }

  const onRadioChange = (e: RadioChangeEvent) =>{
    const value = e.target.value
    let finalPath
    if(value === 'NEW') {
      const directoryPaths = dialog.showOpenDialogSync({
        title:'Select a directory to store the contact file',
        properties: ['openDirectory'] })
      if (directoryPaths && directoryPaths.length) {
        const pathToStore = path.join(directoryPaths[0], `${moment().format('DD_MMMM_YYYY_h_mm_ss')}.sec_contacts`)
        finalPath= pathToStore
      }
    } else if(value === 'EXISTENT' ){
      const filePaths = dialog.showOpenDialogSync({
        filters: [{
          name : '*',
          extensions: ['sec_contacts']
        }],
        title:'Select a contacts file',
        properties: ['openFile'] })
      if (filePaths && filePaths.length) {
        finalPath = filePaths[0]
      }
    }
    if(finalPath){
      setFilePath(finalPath)
      form.setFieldsValue({
        fileSelection: value
      })
    } else {
      setFilePath('')
      form.setFieldsValue({
        fileSelection: ''
      })
    }
  }

  return (
    <div className={className}>
      <Form
        className={className}
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{
          fileSelection: ''
        }}>
        <Form.Item name="fileSelection" rules={[{ required: true, message: 'Please select or create a contacts file' }]}>
          <Radio.Group onChange={debounce(onRadioChange)} size="large">
            <Radio.Button value="NEW">Create a new contact file</Radio.Button>
            <Radio.Button value="EXISTENT">Choose existent contact file</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {Boolean(filePath) && (
          <p>
          Contacts will be saved at: <br/>
            <small>{filePath}</small>
          </p>)}
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input type="password"/>
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm password"
          rules={[{ required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                return !value || getFieldValue('password') === value ?  Promise.resolve(): Promise.reject('The two passwords that you entered do not match!')
              },
            })]}>
          <Input type="password"/>
        </Form.Item>

        <div className={css`display: flex; justify-content: flex-end;`}>
          <Button htmlType="submit" ghost type="primary" size="middle" >
            Enter
          </Button>
        </div>
      </Form>
    </div>
  )
}


export default observer(StorageChoose)
