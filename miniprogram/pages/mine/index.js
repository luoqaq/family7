// pages/mine/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    isShowLogin: false,
    imgs: {
      male: '../../images/male.png',
      female: '../../images/female.jpg'
    },
    sexDesc: {
      male: '男生',
      female: '女生'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  onShow() {
    this.init();
  },

  init() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        currentTab: 'mine'
      })
    }

    this.getUser();
  },

  getUser() {
    app.getUser().then(userInfo => {
      if (!userInfo) {
        this.setData({isShowLogin: true});
      } else {
        this.setData({userInfo})
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

  copy() {
    wx.setClipboardData({
      data: this.data.userInfo._id,
      success() {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },

  handleRegistry() {
    this.setData({isShowLogin: true})
  }
})