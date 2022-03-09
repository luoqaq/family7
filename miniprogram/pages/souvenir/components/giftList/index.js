const { formatDate } = require("../../../../utils/utils");

// pages/souvenir/components/giftList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hisDesc: {
      type: String,
      value: 'He'
    },
    defaultTab: {
      type: String,
      value: 'me',
      observer(v) {
        this.setData({currentTab: v});
      }
    },
    triggerAddGift: {
      type: Boolean,
      observer() {
        this.getGitfs();
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTab: 'me',
    swiperCurrentIndexObj: {
      me: 0,
      she: 1
    },
    myGifts: {
      total: 0,
      list: []
    },
    herGifts: {
      total: 0,
      list: []
    },
    refresherTriggered: false,
    // 查看
    isShowQueryDialog: false,
    currentQueryItem: {},
    // 编辑
    isShowEditDialog: false,
    currentEditItem: {}
  },

  lifetimes: {
    attached() {
      console.log('attached-渲染');
      this.getGitfs();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeTab(e) {
      console.log(e);
      const {tab} = e.currentTarget.dataset;
      console.log(tab)
      this.setData({currentTab: tab})
    },

    getGitfs() {
      wx.showLoading({
        title: '加载中',
      })
      wx.cloud.callFunction({
        name: 'db',
        data: {
          type: 'getGifts',
        }
      }).then(res => {
        console.log('获取礼物', res);
        if (res && res.result && res.result.success) {
          const {data} = res.result;
          if (data) {
            this.setData({
              myGifts: data.myGifts,
              herGifts: data.herGifts
            })
          }
        }
      }).finally(() => {
        this.setData({refresherTriggered: false})
        wx.hideLoading();
      })
    },

    // 下拉刷新
    bindrefresherrefresh(e) {
      console.log(e);
      this.getGitfs();
    },

    handleComplete(e) {
      console.log(e);
      if (!e.detail.value) {
        return;
      }
      const {item} = e.currentTarget.dataset;
      const _this = this;
      wx.showModal({
        title: '礼物已收到',
        content: '请问确定已经收到礼物了吗',
        cancelColor: '#666',
        success(res) {
          if (res.confirm) {
            wx.cloud.callFunction({
              name: 'db',
              data: {
                type: 'completeGift',
                id: item._id
              }
            }).then(res =>{
              console.log('完成礼物回调', res)
              if (res && res.result && res.result.success) {
                wx.showToast({
                  title: '已完成',
                })
                _this.getGitfs();
              }
            })
          }
        }
      })
      console.log('完成', e);
    },
    handleQuery(e) {
      const {item} = e.currentTarget.dataset;
      console.log('查看', item);
      this.setData({
        isShowQueryDialog: true,
        currentQueryItem: {...item}
      })
    },
    handleEdit(e) {
      const {item} = e.currentTarget.dataset;
      console.log('编辑', item);
      if (item.is_complete) {
        wx.showToast({
          icon: 'none',
          title: '已完成啦，不能编辑哦',
        })
        return;
      }
      this.setData({
        isShowEditDialog: true,
        currentEditItem: {...item}
      })
    },
    handleDelete(e) {
      const {item} = e.currentTarget.dataset;
      console.log('删除', item);
      const _this = this;
      wx.showModal({
        title: '删除确认',
        content: `请问确定要删除 ${item.name} 吗`,
        cancelColor: '#666',
        success(res) {
          if (res.confirm) {
            wx.cloud.callFunction({
              name: 'db',
              data: {
                type: 'deleteGift',
                id: item._id
              }
            }).then(res =>{
              console.log('删除礼物回调', res)
              if (res && res.result && res.result.success) {
                wx.showToast({
                  title: '已删除',
                })
                _this.getGitfs();
              }
            })
          }
        }
      })
    },

    handleEditSuccess() {
      this.handleCloseDialog();
      this.getGitfs();
    },

    handleCloseDialog() {
      this.setData({
        isShowEditDialog: false,
        currentEditItem: {},
        isShowQueryDialog: false,
        currentQueryItem: {}
      })
    }
  }
})
