// pages/souvenir/components/giftForm/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '礼物'
    },
    type: {
      type: String,
      value: 'query'
    }, // add, query, edit
    item: {
      type: Object,
      value: {},
      observer(item) {
        console.log('监听到item改变', item);
        this.setData({
          name: item.name,
          date: item.wanna_date,
          isPresent: item.is_present,
          id: item._id
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    id: '',
    name: '',
    date: '',
    isPresent: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    submit(e) {
      console.log('submit', e);
      const {date, name, isPresent} = e.detail.value;
      if (!date || !name) {
        wx.showToast({
          icon: 'none',
          title: !name ? '请输入礼物名称' : '请选择日期',
        })
        return;
      }
      const {type} = this.data;
      const params = {
        type: type === 'add' ? 'addGift' : 'updateGift',
        name,
        date,
        isPresent: isPresent || false
      }
      if (type === 'edit') {
        params.id = this.data.id
      }
      wx.cloud.callFunction({
        name: 'db',
        data: params
      }).then(res => {
        const data = res.result;
        console.log('接口请求成功', res);
        if (data && data.success) {
          wx.showToast({
            title: '提交成功！',
          })
          this.triggerEvent('submitSuccess');
        } else {
          wx.showToast({
            icon: 'error',
            title: '提交失败！',
          })
          this.triggerEvent('submitFail');
        }
      }).catch(err => {
        console.error('提交失败', err);
        wx.showToast({
          icon: 'error',
          title: '提交失败！',
        })
        this.triggerEvent('submitFail');
      })
    },
    handleChangeDate(e) {
      this.setData({
        date: e.detail.value
      })
    },
    close() {
      this.triggerEvent('close')
    }
  }
})
