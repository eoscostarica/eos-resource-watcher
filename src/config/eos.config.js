module.exports = {
  endpoint: process.env.EOS_API_ENDPOINT,
  chainId: process.env.EOS_API_CHAIN_ID,
  payerAccount: process.env.EOS_PAYER_ACCOUNT,
  payorPerms: process.env.EOS_PAYER_PERMISION,
  pvtKey: process.env.EOS_PAYER_PRIVATE_KEY,
  watchAccount: process.env.EOS_WATCH_ACCOUNT,
  powerUpAmount: process.env.EOS_POWERUP_AMOUNT,
  threshold: process.env.EOS_POWERUP_THRESHOLD
}
