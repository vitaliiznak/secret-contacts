
import { css } from '@emotion/css'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../../stores/rootContext'


const StorageChoose = ({className = ''}: {
  className?: string
}): React.ReactElement => {
  const {
    contactsStore: { enter }
  } = useStore()

  return (
    <div>
      <Button size="large" type="primary" ghost block onClick={() => {
        enter(null)
      }}>
        Create a new contact book
      </Button>
      <div className={css`height: 40px;`}/>
      <Button size="large" type="primary" ghost block>
        Open contact book file
      </Button>
    </div>
  )
}


export default observer(StorageChoose)
