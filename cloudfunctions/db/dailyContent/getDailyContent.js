const cloud = require('wx-server-sdk');
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV});

const db = cloud.database();

const dbDC = db.collection('daily-content');

exports.main = async (event, context) => {
    const result = await dbDC.get()
    return {
        success: true,
        data: result
    }
}