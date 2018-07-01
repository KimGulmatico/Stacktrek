import setupServices from '../backend/setupServices'

const io = require('socket.io-client')
const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio-client')
const authentication = require('@feathersjs/authentication-client')

const socket = io(window.location.origin, {
  transports: ['websocket'],
  forceNew: true,
})

const app = feathers()
app.configure(socketio(socket))
app.configure(authentication({ storage: window.localStorage }))
app.configure(setupServices())

window.app = app

export default app
