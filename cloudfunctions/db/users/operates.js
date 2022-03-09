const cloud = require('wx-server-sdk');
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV});

const db = cloud.database()
const dbU = db.collection('users');
const _ = db.command;

const getUserByOpenid = async (openid) => {
  let openId = openid;
  if (!openId) {
    openId = cloud.getWXContext().OPENID;
  }
  const result = await dbU.where({
    openid: openId
  }).get();
  console.log('根据openid获取user', result);
  return result;
}

const getUserByName = async (name) => {
  const result = await dbU.where({
    name
  }).get();
  console.log('根据名字获取user', result);
  return result;
}

const addUser = async (user) => {
  const openid = cloud.getWXContext().OPENID;
  const result = await dbU.add({
    data: {
      openid,
      create_time: +new Date(),
      sex: user.sex,
      name: user.name,
      cp_openid: '',
      phone: user.phone || '',
    }
  });
  return result;
}

const updateUser = async (user = {}) => {
  const openid = cloud.getWXContext().OPENID;
  const data = [];
  Object.keys(user).forEach(key => {
    data[key] = _.set(user[key])
  })
  try {
    return await dbU.where({openid}).update({data}) 
  } catch (error) {
    return error;
  }
}

exports.getUserByOpenid = getUserByOpenid;
exports.getUserByName = getUserByName;
exports.updateUser = updateUser;
exports.addUser = addUser;
