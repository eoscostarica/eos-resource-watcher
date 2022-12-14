const eosUtil = require('./utils/eos.util')
const { eosConfig } = require('./config')

const watchAccounts = [eosConfig.watchAccount]
const payer = eosConfig.payerAccount
const payerPerms = eosConfig.payorPerms

async function init() {
  try {
    for (const account of watchAccounts) {
      console.log('Checking Existing Balance for Payor Account:', payer)
      const existingBalance = await eosUtil.getCurrencyBalance(
        'eosio.token',
        payer,
        'EOS'
      )
      const existingBalanceNum = Number(existingBalance[0].split(' ')[0])
      console.log('Existing Payor Balance :', existingBalanceNum)

      if (eosConfig.powerUpAmount > existingBalanceNum) continue

      console.log('Checking Available Resources for Account:', account)
      console.log('CPU threshold for PowerUp is: ', eosConfig.threshold)

      const accountStats = await eosUtil.getAccount(account)
      const existingCPU = Number(accountStats.cpu_limit.available)
      const usedCPU = Number(accountStats.cpu_limit.used)
      console.log('Existing CPU:', existingCPU)
      console.log('Used CPU:', usedCPU)
      const existingNET = Number(accountStats.net_limit.available)
      const usedNET = Number(accountStats.net_limit.used)
      console.log('Existing NET:', existingNET)
      console.log('Used NET:', usedNET)
      console.log('Current CPU Usage Percentage: ', (usedCPU/existingCPU)*100, '%')

      if ((usedCPU/existingCPU) < eosConfig.threshold) continue

      console.log('Available CPU is below threshhold of: ', eosConfig.threshold)
      console.log('Power Up Amount: ', eosConfig.powerUpAmount + ' EOS')
      console.log('NET_frac: ', eosConfig.net)
      console.log('CPU_frac: ', eosConfig.cpu)

      const transact = await eosUtil
        .transact([
          {
            account: 'eosio',
            name: 'powerup',
            authorization: [{ actor: payer, permission: payerPerms }],
            data: {
              payer,
              receiver: account,
              days: 1,
              net_frac: eosConfig.net,
              cpu_frac: eosConfig.cpu,
              max_payment: eosConfig.powerUpAmount + ' EOS'
            }
          }
        ])
        .catch(er => console.log(er.toString()))

      if (transact) console.log(transact)

      const cpuAfter = (await eosUtil.getAccount(account)).cpu_limit.available
      console.log(
        'CPU available after Power-Up:',
        Number(cpuAfter).toLocaleString(),
        '\n'
      )

      const netAfter = (await eosUtil.getAccount(account)).net_limit.available
      console.log(
        'NET available after Power-Up:',
        Number(netAfter).toLocaleString(),
        '\n'
      )
    }
  } catch (error) {
    console.error(error)
  }
}
init()
