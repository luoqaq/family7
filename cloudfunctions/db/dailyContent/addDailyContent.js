const cloud = require('wx-server-sdk');
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV});
const userOperates = require('../users/operates')

const db = cloud.database();
const dbDC = db.collection('daily-content');

exports.main = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext();
  console.log('云函数-添加数据', event)
  let name = '佚名'
  let avatar = 'cloud://cloud1-4g8nibyi77844097.636c-cloud1-4g8nibyi77844097-1256374350/male.png'
  const user = await userOperates.getUserByOpenid();
  if (user && user.data && user.data.length) {
    const o = user.data[0];
    name = o.name;
    if (o.sex === 'male') {
      avatar = 'cloud://cloud1-4g8nibyi77844097.636c-cloud1-4g8nibyi77844097-1256374350/male.png'
    } else if (o.sex === 'female') {
      avatar = 'cloud://cloud1-4g8nibyi77844097.636c-cloud1-4g8nibyi77844097-1256374350/female.jpg'
    }
  }
  const result = await dbDC.add({
    data: {
      content: event.content,
      name,
      avatar,
      time: +new Date(),
      openid: wxContext.OPENID
    }
  })
  return {
    success: true,
    data: result
  }
}