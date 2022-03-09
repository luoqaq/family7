const cloud = require('wx-server-sdk');
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV});

const db = cloud.database();
const dbG = db.collection('gift');

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const result = await dbG.doc(event.id).update({
    data: {
      is_complete: true,
      complete_time: +new Date(),
      complete_openid: wxContext.OPENID
    }
  })
  console.log('完成', result);
  return {
    success: true,
    data: result
  }
}