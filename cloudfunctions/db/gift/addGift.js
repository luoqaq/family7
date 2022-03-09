const cloud = require('wx-server-sdk');
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV});

const db = cloud.database();
const dbG = db.collection('gift');

exports.main = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext();
  const result = await dbG.add({
    data: {
      name: event.name,
      wanna_date: event.date,
      is_present: event.isPresent,
      create_time: +new Date(),
      is_complete: false,
      complete_time: '',
      is_delete: false,
      delete_time: 0,
      update_time: +new Date(),
      openid: wxContext.OPENID
    }
  })
  return {
    success: true,
    data: result
  }
}