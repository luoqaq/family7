const cloud = require('wx-server-sdk');
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV});
const operates = require('./operates');

exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID;
  let res = await operates.getUserByOpenid(openid);
  if (!res.result || !res.data.length) {
    return {
      success: false,
      data: {
        code: 'noExist',
        errMsg: '不存在该用户信息' 
      }
    }
  }
  const {name, sex, phone} = event;
  if (!name && !sex && !phone) {
    return {
      success: false,
      data: {
        code: 'lack',
        errMsg: '没有要修改的信息：名称、性别、手机号均无'
      }
    }
  }
  res = await operates.updateUser({name, sex, phone});
  return {
    success: true,
    data: {
      code: 'success',
      data: res
    }
  }
}
