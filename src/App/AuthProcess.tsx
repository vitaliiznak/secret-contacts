import { observer } from 'mobx-react-lite'

import React from 'react'
import { Layout } from 'antd'
import { css } from '@emotion/css'
import { useStore } from '../stores/rootContext'
import StorageChoose from '../screens/StorageChoose'
import RouterAuthenteticated from '../screens/RouterAuthenteticated'

const AuthProcess = () => {
  const {
    contactsStore: { filePath },
  } = useStore()

  return (
    <Layout
      className={css`
        min-height: 100vh;
        height: 100%;
      `}
    >
      <div
        className={css`
          max-width: 1000px;
          margin: 0 auto;
        `}
      >
        <h1>Secret contacts</h1>
        {filePath === undefined ? <StorageChoose/> : <RouterAuthenteticated/> }
      </div>
    </Layout>
  )
}

export default observer(AuthProcess)
