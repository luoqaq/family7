// index.js
const app = getApp()
const { formatDate } = require('../../utils/utils.js');
const startDate = +new Date('2021-04-03');
const now = +new Date();
const days = Math.floor((now - startDate) / 1000 / 60 / 60 / 24);

Page({
  data: {
    list: [],
    input: '',
    days: days,
    buttons: [
      { text: '取消' },
      { text: '确认' }
    ],
    isShowLogin: false,
  },

  handleInput(e) {
    this.setData({input: e.detail.value})
  },
  submit() {
    wx.cloud.callFunction({
      name: 'db',
      data: {
        type: 'addDailyContent',
        content: this.data.input
      }
    }).then(res => {
      console.log('添加数据', res)
      this.getList();
    })
  },

  onLoad() {
    this.init();
  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        currentTab: 'love'
      })
    }
  },

  init() {
    this.getUser();
    this.getList();
  },

  getUser() {
    app.getUser().then(userInfo => {
      console.log('index页获取user', userInfo);
      if (!userInfo) {
        this.setData({isShowLogin: true});
      }
    });
  },
  handleLoginSuccess() {
    this.setData({isShowLogin: false});
  },
  handleCloseLogin() {
    this.setData({isShowLogin: false});
  },

  getList() {
    wx.cloud.callFunction({
      name: 'db',
      data: {
        type: 'getDailyContent'
      }
    }).then(res => {
      if (res.result && res.result.success) {
        const { data } = res.result.data;
        if (data?.length) {
          const list = data.map(item => {
            item.time = formatDate(new Date(item.time), 'yyyy-MM-dd hh:mm:ss')
            return item;
          })
          this.setData({ list });
        }
      }
    })
  }
});
