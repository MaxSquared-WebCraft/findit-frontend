import React from 'react';
import './assets/app.css';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { initStore } from './store'
import config from './lib/config'
import { Reboot } from 'material-ui'
import Routes from './routes'

const { env } = config

const store = initStore(env)

const App = () => [
  <Reboot key='style-reset-component'/>,
  <Provider key='general-app-component' store={store}>
    <Router><Routes store={store}/></Router>
  </Provider>
]


export default App;
