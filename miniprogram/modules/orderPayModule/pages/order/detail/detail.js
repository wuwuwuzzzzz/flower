import { reqOrderAddress } from '@/api/orderpay';
import { reqOrderInfo } from '../../../../../api/orderpay';

// 获取应用实例
const app = getApp()

Page({

  data: {
    // 订购人姓名
    buyName: '',
    // 订购人手机号
    buyPhone: '',
    // 期望送达日期
    deliveryDate: '选择送达日期',
    // 收货地址
    orderAddress: {},
    // 订单详情
    orderInfo: {},
    // 祝福语
    blessing: '',
    // 期望送达日期弹框
    show: false,
    minDate: new Date().getTime(),
    currentDate: new Date().getTime()
  },

  // 选择期望送达日期
  onShowDateTimerPopUp() {
    this.setData({
      show: true
    })
  },

  // 期望送达日期确定按钮
  onConfirmTimerPicker(event) {
    this.setData({
      show: false
    })
  },

  // 期望送达日期取消按钮 以及 关闭弹框时触发
  onCancelTimePicker() {
    this.setData({
      show: false,
      minDate: new Date().getTime(),
      currentDate: new Date().getTime()
    })
  },

  // 跳转到收货地址
  toAddress() {
    wx.navigateTo({
      url: '/modules/settingModule/pages/address/list/index'
    })
  },

  // 获取收货地址
  async getAddress() {

    const addressId = app.globalData.address.id

    if (addressId) {
      this.setData({
        orderAddress: app.globalData.address
      })
      return
    }

    const { data: orderAddress } = await reqOrderAddress()
    this.setData({ orderAddress })
  },

  // 获取订单详情
  async getOrderInfo() {
    const { data: orderInfo } = await reqOrderInfo()
    const orderGoods = orderInfo.cartVoList.find(item => item.blessing !== '')

    this.setData({
      orderInfo,
      blessing: orderGoods && orderGoods.blessing
    })
  },

  onShow() {
    this.getAddress()
    this.getOrderInfo()
  },

  onUnload() {
    app.globalData.address = {}
  }

})
