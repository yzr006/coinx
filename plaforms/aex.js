const crypto = require('crypto')
const rq = require('request-promise')
const apiKey = require('./../api_key_config')
const utils = require('./../utils')

const now = Date.now()
const beforeMd5 = `${apiKey.aex.key}_${apiKey.aex.userId}_${apiKey.aex.skey}_${now}`
const md5 = utils.getMd5(beforeMd5)

module.exports = {
    /**
     * 获取指定币种&指定定价单位的当前价格
     * @param {string} coin 币种
     * @param {string} unit 单位
     */
    async getPrice(coin, unit) {
        console.log('aex: 开始查询价格')
        const rst = await rq.get(`https://api.aex.com/ticker.php?c=${coin}&mk_type=${unit}`).catch(e => e)

        console.log('aex: 结束查询价格')
        
        if (!rst.ticker) {
            return false
            console.log(rst)
        }

        return {
            buy: rst.ticker.buy,
            sell: rst.ticker.sell,
        }

    },
    async myAccount() {
        console.log('aex: 查询账户余额开始')
        reqData = {
            key: apiKey.aex.key,
            skey: apiKey.aex.skey,
            time: now,
            md5,
        }
        const rst = await rq.post('https://api.aex.com/getMyBalance.php',{form: reqData}).catch(e => e)

        return {
            btc: rst.btc_balance,
            ltc: rst.lec_balance,
            bcc: rst.bcc_balance,
            eth: rst.eth_balance,
            
            usd: rst.bitusd_balance,
            cny: rst.bitcny_balance,
        }
    },
    /**
     * 交易
     * @param {number} type 1:买，2:卖
     * @param {string} unit 定价单位。
     * @param {float} price 价格
     * @param {float} amount 交易数量
     * @param {string} coinname 交易币种
     */
    async transaction(type, unit, price, amount, coinname) {
        console.log('aex: 交易开始')
        const reqData = {
            key: apiKey.aex.key,
            skey: apiKey.aex.skey,
            time: now,
            md5,
            type,
            mk_type: unit,
            price,
            amount,
            coinname,
        }
        const rst = await rq.post('https://api.aex.com/submitOrder.php',{form: reqData}).catch(e => e)

        console.log(`aex: 交易结束`)
        console.log(`结果：${rst}`)
    },
}