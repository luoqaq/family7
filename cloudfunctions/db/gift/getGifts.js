const cloud = require('wx-server-sdk');
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV});

const db = cloud.database();
const dbG = db.collection('gift');
const _ = db.command;

const user = require('../users/operates');

const max_limit = 100;
const getGiftByOpenid = async (openid, cp_openid) => {
  const whereParams = [
    {openid, is_present: false, is_delete: false}
  ];
  if (cp_openid) {
    whereParams.push({openid: cp_openid, is_present: true, is_delete: false})
  }
  console.log('whereParams', whereParams);
  const totalRes = await dbG.where(_.or(whereParams)).count();
  const total = totalRes.total;
  console.log('总数', total);
  if (!total) {
    return {
      total,
      list: []
    }
  }
  const batchTimes = Math.ceil(total / 100)
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = dbG.where(_.or(whereParams)).skip(i * max_limit).limit(max_limit).get();
    tasks.push(promise);
  }
  const list = (await Promise.all(tasks)).reduce((acc, cur) => {
    console.log('获取礼物数据', cur)
    return acc.concat(cur.data);
  }, [])
  return {
    total,
    list
  }
}

exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID;

  // 获取cp的数据
  let cp_openid = null;
  const cpRes = await user.getUserByOpenid();
  if (cpRes && cpRes.data && cpRes.data.length) {
    cp_openid = cpRes.data[0].cp_openid;
  }

  const myGifts = await getGiftByOpenid(openid, cp_openid);

  let herGifts = {
    list: [],
    total: 0
  }
  if (cp_openid) {
    console.log('有cp，获取cp的礼物列表');
    herGifts = await getGiftByOpenid(cp_openid, openid);
  }
  return {
    success: true,
    data: {
      myGifts,
      herGifts
    }
  }
}