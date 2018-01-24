import React from 'react';
import './assets/app.css';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { initStore } from './store'
import config from './lib/config'
import { Reboot } from 'material-ui'
import Routes from './routes'
import BaseApi from './lib/api/finditApi'

const { env, base } = config

const store = initStore(env)
BaseApi.initApi(base)

const App = () => [
  <Reboot key='style-reset-component'/>,
  <Provider key='general-app-component' store={store}>
    <Router><Routes store={store}/></Router>
  </Provider>
]

export default App;
