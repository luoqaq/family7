// 数据库操作云函数入口文件
const dailyContent = require('./dailyContent');
const gift = require('./gift');
const user = require('./users');

// 云函数入口函数
exports.main = async (event, context) => {
  switch(event.type) {
    // 用户
    case 'getUser':
      return await user.getUser(event, context);
    case 'addUser':
      return await user.addUser(event, context);
    case 'updateUser':
      return await user.updateUser(event, context);

    case 'getDailyContent':
      return await dailyContent.getDailyContent(event, context);
    case 'addDailyContent':
      return await dailyContent.addDailyContent(event, context);

    // 礼物
    case 'addGift':
      return await gift.addGift(event, context);
    case 'getGifts':
      return await gift.getGifts(event, context);
    case 'updateGift':
      return await gift.updateGift(event, context);
    case 'deleteGift':
      return await gift.deleteGift(event, context);
    case 'completeGift':
      return await gift.completeGift(event, context);
  }
}