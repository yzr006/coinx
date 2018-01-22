const crypto = require('crypto')
const rq = require('request-promise')
const apiKey = require('./../api_key_config')

const getMd5 = function(str) {
    const md5 = crypto.createHash('md5')
    return md5.update(str).digest('hex')
}

const getMyTrade = async function() {
    // console.log(getMd5(`${apiKey.aex.key}_${apiKey.aex.userId}_${apiKey.aex.skey}_0`))
    reqData = {
        key: apiKey.aex.key,
        skey: apiKey.aex.skey,
        time: 0,
        md5: getMd5(`${apiKey.aex.key}_${apiKey.aex.userId}_${apiKey.aex.skey}_0`),
    }
    const rst = await rq.post('https://api.aex.com/getMyBalance.php',{form: reqData})
    console.log(Date.now())
}

module.exports = {
    getMyTrade
}