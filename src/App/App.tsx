import { ConfigProvider } from 'antd'
import React from 'react'

import { HashRouter as Router } from 'react-router-dom'
import Root from '../stores/Root'
import { StoreProvider } from '../stores/rootContext'

import RouterMain from './RouterMain'

const rootAux = new Root()
rootAux.init()

const App = (): React.ReactElement => {
  return (
    <StoreProvider stores={rootAux.stores}>
      <ConfigProvider componentSize="small">
        <Router basename={process.env.REACT_APP_BASE_URL}>
          <RouterMain />
        </Router>
      </ConfigProvider>
    </StoreProvider>
  )
}

export default App
