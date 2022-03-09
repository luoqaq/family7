// packages/souvenir/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {id: 'commemorationDay', name: '纪念日'},
      {id: 'gift', name: '礼物'},
    ],
    currentTabId: 'gift',
    isShowLogin: false,
    userInfo: null,
    hisDesc: 'He',
    triggerAddGift: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        currentTab: 'souvenir'
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getUser();
  },

  handleChangeTab(e) {
    console.log(e);
    this.setData({
      currentTabId: e.detail.id
    })
  },

  // 用户登录相关
  getUser() {
    app.getUser().then(userInfo => {
      if (!userInfo) {
        this.setData({isShowLogin: true});
      } else {
        console.log('userInfo.sex', userInfo.sex);
        this.setData({
          userInfo,
          hisDesc: userInfo.sex === 'male' ? 'She' : 'He'
        })
        this.setData({isShowLogin: false});
      }
    });
  },
  handleLoginSuccess() {
    this.getUser();
  },
  handleCloseLogin() {
    this.setData({isShowLogin: false});
  },

  handleAddGift() {
    console.log('监听到增加了礼物');
    this.setData({
      triggerAddGift: !this.data.triggerAddGift
    })
  }
})