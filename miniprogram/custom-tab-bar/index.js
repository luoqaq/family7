// components/tabbar/index.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTab: 'love',
    tabs: [
      {name: '恋爱日常', id: 'love', path: '/pages/index/index'},
      {name: '纪念', id: 'souvenir', path: '/pages/souvenir/index'},
      {name: '社区', id: 'community', path: '/pages/community/index'},
      {name: '我', id: 'mine', path: '/pages/mine/index'},
    ]
  },
  attached() {
    console.log('attched', this.getTabBar());
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleChageTab(e) {
      const {item} = e.currentTarget ? e.currentTarget.dataset : e.target.dataset;
      console.log('handleChageTab', item);
      wx.switchTab({
        url: item.path,
      })
      // this.setData({
      //   currentTab: item.id
      // })
    }
  }
})
