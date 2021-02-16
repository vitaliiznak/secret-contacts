import 'antd/dist/antd.css'

import { ConfigProvider } from 'antd'
import React from 'react'

import { HashRouter as Router } from 'react-router-dom'
import Root from '../stores/Root'
import { StoreProvider } from '../stores/rootContext'

import Main from './AuthProcess'

const rootAux = new Root()
rootAux.init()

const App = (): React.ReactElement => {
  return (
    <StoreProvider stores={rootAux.stores}>
      <ConfigProvider componentSize="small">
        <Router basename={process.env.REACT_APP_BASE_URL}>
          <Main />
        </Router>
      </ConfigProvider>
    </StoreProvider>
  )
}

export default App
