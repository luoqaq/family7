// components/login/index.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    submit(e) {
      const {name, sex} = e.detail.value;
      if (!name || !sex) {
        wx.showToast({
          icon: 'none',
          title: '请完善信息',
        })
        return;
      }
      wx.cloud.callFunction({
        name: 'db',
        data: {
          type: 'addUser',
          name,
          sex
        }
      }).then(res => {
        console.log('注册信息', res)
        if (res && res.result && res.result.success) {
          wx.showToast({
            title: '提交成功',
          })
          this.triggerEvent('success');
          // 重置数据
          app.getUser();
        } else {
          console.error('注册个人信息失败');
          let title = '提交失败';
          if (res && res.result && res.result.data && res.result.data.errMsg) {
            title = res.result.data.errMsg;
          }
          wx.showToast({
            icon: 'error',
            title
          })
        }
      })
    },
    close() {
      this.triggerEvent('close')
    }
  }
})
