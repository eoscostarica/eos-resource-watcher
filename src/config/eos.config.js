module.exports = {
  endpoint: process.env.EOS_API_ENDPOINT,
  chainId: process.env.EOS_API_CHAIN_ID,
  payorAccount: process.env.EOS_PAYOR_ACCOUNT,
  payorPerms: process.env.EOS_PAYOR_PERMISION,
  pvtKey: process.env.EOS_PAYOR_PRIVATE_KEY,
  watchAccount: process.env.EOS_WATCH_ACCOUNT,
  powerUpAmount: process.env.EOS_POWERUP_AMOUNT,
  threshold: process.env.EOS_POWERUP_THRESHOLD
}
