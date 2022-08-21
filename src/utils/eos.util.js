const { Api, JsonRpc } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig')
const fetch = require('node-fetch')
const { TextEncoder, TextDecoder } = require('util')
const EosApi = require('eosjs-api')

const { eosConfig } = require('./../config')

const privateKeys = [eosConfig.pvtKey]
const signatureProvider = new JsSignatureProvider(privateKeys);

const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()

const rpc = new JsonRpc(eosConfig.endpoint, { fetch })

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })

const eosApi = EosApi({
  httpEndpoint: eosConfig.endpoint,
  verbose: false,
  fetchConfiguration: {}
})

const getAccount = async account => {
  try {
    const accountInfo = await eosApi.getAccount(account)

    return accountInfo
  } catch (error) {
    return null
  }
}
const getCurrencyBalance = (code, account, symbol) =>
  eosApi.getCurrencyBalance(code, account, symbol)

const transact = async (actions) => {
  try {
    const keys = [eosConfig.pvtKey]

    const api = new Api({
      rpc,
      textDecoder,
      textEncoder,
      chainId: eosConfig.chainId,
      signatureProvider: new JsSignatureProvider(keys)
    })

    const transaction = await api.transact(
      {
        actions
      },
      {
        blocksBehind: 3,
        expireSeconds: 30
      }
    )

    return transaction
  } catch (error) {
    throw new Error(
      error.message.replace(/assertion failure with message: /gi, '')
    )
  }
}

module.exports = {
  getAccount,
  getCurrencyBalance,
  transact
}