const { default: Axios } = require('axios')
/** 取得遊戲連結 
 * @param {*} user 玩家帳號
 * @param {*} siteNum 1.開發站 2.測試站(對外) 3.正式站
 * @param {*} game_id GameCode
 * @param {*} language 語系 1.簡中 2.英文 3.越南文 4.泰文, 5.韓文, 6.印尼文
 * @returns 連結URL
*/
const getUrlFormAPI = async function (user, siteNum, game_id, lang) {
  let language = [
    'zh-cn',
    'en',
    'vi',
    'th',
    'ko',
    'id'
  ]
  const site = [
    'http://13.124.186.239:13101', // 開發站
    'http://18.163.114.244:13101',  // 測試站(對外)
    'https://api.msgaming.online' // 正式站
  ]
  let reqData = {
    baseUrl: `${site[siteNum - 1]}`,
    url: '/debug/gametoken',
    data: {
      user_name: user,
      game_id: game_id,
      lang: language[lang - 1],
      redirect: '0'
    }
  }
  let resUrl = await Axios.get(`${reqData.baseUrl}${reqData.url}`, { params: reqData.data })
  return resUrl.data.game_url
}
module.exports = {
  getUrlFormAPI
}