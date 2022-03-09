const cloud = require('wx-server-sdk');
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV});
const operates = require('./operates');

exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID;
  let result = await operates.getUserByOpenid(openid);
  console.log('获取本人用户信息', result)
  if (!result.data || result.data.length <= 0) {
    // 无此人数据
    result = null
  } else {
    result = result.data[0];
    let cp_reult = null
    if (result.cp_openid) {
      cp_reult = await operates.getUserByOpenid(result.cp_openid);
      if (cp_reult.data && cp_reult.data.length) {
        cp_reult = cp_reult.data[0];
      }
    }
    result.cpInfo = cp_reult;
  }
  return {
    success: true,
    data: result
  };
}