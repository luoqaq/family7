const cloud = require('wx-server-sdk');
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV});

const db = cloud.database();
const dbG = db.collection('gift');

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const result = await dbG.doc(event.id).update({
    data: {
      name: event.name,
      wanna_date: event.time,
      is_present: event.isPresent,
      update_time: +new Date(),
      update_openid: wxContext.OPENID
    }
  })
  console.log('更新', result);
  return {
    success: true,
    data: result
  }
}