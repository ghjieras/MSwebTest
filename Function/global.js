const {
  default: Axios
} = require('axios')
/** 取得遊戲連結 
 * @param {*} user 玩家帳號
 * @param {*} siteNum 1.開發站 2.測試站(對外) 3.正式站
 * @param {*} game_id GameCode
 * @param {*} lang 語系 1.簡中 2.英文 3.越南文 4.泰文, 5.韓文, 6.印尼文
 * @param {*} operator_id
 * @param {*} game_class_id tab API 0.全部 1.老虎機 2.捕魚機
//  * @param {*} logo logo
 * @returns 連結URL
 */
const getUrlFormAPI = async function (user, siteNum, game_id, lang, operator_id = 3) {
  let language = [
    'zh-cn',
    'en',
    'vi',
    'th',
    'ko',
    'id'
  ]
  const site = [
    'https://api.msgdev.info', // 開發站
    'https://api.msslot.bet', // 測試站(對外)
    'https://api.msgaming.online' // 正式站
  ]
  let reqData = {
    baseUrl: `${site[siteNum - 1]}/`,
    url: 'debug/gametoken',
    data: {
      user_name: user,
      game_id: game_id,
      lang: language[lang - 1],
      operator_id: operator_id,
      // game_class_id: game_class_id,
      redirect: '0'
    }
  }
  let resUrl = await Axios.get(`${reqData.baseUrl}${reqData.url}`, {
    params: reqData.data
  })
  console.log(resUrl.data)
  return resUrl.data.game_url
}

// const GameNum1 = require('../Variable/variable').gameNum

// let userData = {
//   user: '',
//   site: 0,
//   operator_id: 16,
//   total: '', // 根據目標站台
//   tab: 5, //頁數
//   start: 0 // 開始的陣列
// };


// async function DevCn() {
//   userData['user'] = 'auto001',
//     userData['site'] = 1,
//     userData['lang'] = 1,
//     userData['operator_id'] = 16,
//     userData['total'] = GameNum1.length // 開發站DOM
//   return new Promise(async (resolve, reject) => {
//     let ret
//     ret = await getUrlFormAPI(userData.user, userData.site, 0, userData.lang, userData.operator_id, 0);
//     resolve(ret)
//   })
// }

// (async () => {
//   await DevCn().then((ret) => {
//     console.log('ssss')
//   })
// })()



module.exports = {
  getUrlFormAPI
}