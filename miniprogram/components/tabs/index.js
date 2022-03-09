// components/tabs/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    currentTabId: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeTab(e) {
      const {item, index} = e.currentTarget.dataset;
      this.triggerEvent('changeTab', item, index);
    }
  }
})
