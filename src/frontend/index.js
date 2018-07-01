import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import Routes from './routes'
import Header from './components/header'
import AuthenticateUser from './components/authenticateUser'
import './style.css'
import store from './store'
import { connectToContract, initializeWeb3Error } from './actions/web3Actions'
import getWeb3 from './util/getWeb3'


const App = () => {
  if (window.location.hash === '#/_=_') {
    return <Redirect to="/" />
  }
  return (
    <Layout>
      <Header location={window.location.hash} />
      <Routes />
    </Layout>
  )
}

getWeb3
  .then(() => {
    console.log('Web3 initialized')
    store.dispatch(connectToContract())
  })
  .catch((e) => {
    console.log('Error in web3 initialization')
    store.dispatch(initializeWeb3Error(e))
  })


ReactDOM.render(
  <Provider store={store}>
    <Fragment>
      <AuthenticateUser />
      <Router>
        <App />
      </Router >
    </Fragment>
  </Provider>
  ,
  document.getElementById('app'),
)
