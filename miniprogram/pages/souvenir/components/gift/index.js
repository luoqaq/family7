// packages/souvenir/gift/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hisDesc: {
      type: String,
      value: 'He'
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
    handleTap(e) {
      const {type} = e.currentTarget.dataset;
      console.log('类型', type);
    }
  }
})
