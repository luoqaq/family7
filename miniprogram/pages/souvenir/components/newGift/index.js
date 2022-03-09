const { formatDate } = require("../../../../utils/utils");

// packages/souvenir/components/newGift/index.js
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
    isShowDialog: false,
    date: '',
    startDate: formatDate(new Date(), 'yyyy-MM-dd')
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapNew() {
      this.setData({isShowDialog: true});
    },
    submitSuccess() {
      this.setData({isShowDialog: false});
      this.triggerEvent('add');
    },
    close() {
      this.setData({
        isShowDialog: false
      })
    }
  }
})
