require('babel-register')({
  ignore: /node_modules\/(?!zeppelin-solidity)/,
})
require('babel-polyfill')

const HDWalletProvider = require('truffle-hdwallet-provider')

const mnemonic = 'solution document segment sugar token equip tomorrow promote search plunge brick snow'

module.exports = {
  networks: {
    rinkeby: {
      provider() {
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/4j50CPIg7m1Fp24GLDrR')
      },
      network_id: 3,
    },
    development: {
      host: '127.0.0.1',
      network_id: '*',
      port: 7545,
    },
  },
}
