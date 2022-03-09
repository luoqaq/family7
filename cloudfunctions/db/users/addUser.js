const cloud = require('wx-server-sdk');
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV});
const operates = require('./operates');

exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID;
  let res = await operates.getUserByOpenid(openid);
  if (res.data && res.data.length) {
    return {
      success: false,
      data: {
        code: 'already',
        errMsg: '您已注册' 
      }
    }
  }
  const {name, sex, phone} = event;
  if (!name || !sex) {
    return {
      success: false,
      data: {
        code: 'lack',
        errMsg: '用户名或性别未填入'
      }
    }
  }
  res = await operates.addUser({name, sex, phone});
  return {
    success: true,
    data: {
      code: 'success',
      data: res
    }
  }
}
