import { reqOrderAddress } from '@/api/orderpay';
import { reqBuyNowGood, reqOrderInfo, reqOrderSubmit, reqPayStatus, reqPrePayInfo } from '../../../../../api/orderpay';
import { formatTime } from '@/utils/formatTime';
import Schema from 'async-validator';
import { debounce } from 'miniprogram-licia';

// 获取应用实例
const app = getApp()

Page({

  data: {
    // 订购人姓名
    buyName: '',
    // 订购人手机号
    buyPhone: '',
    // 期望送达日期
    deliveryDate: '',
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

  // 提交订单
  submitOrder: debounce(async function () {
    const {
      buyName,
      buyPhone,
      deliveryDate,
      orderAddress,
      blessing,
      orderInfo
    } = this.data

    const params = {
      buyName,
      buyPhone,
      cartList: orderInfo.cartVoList,
      deliveryDate,
      remarks: blessing,
      userAddressId: orderAddress.id
    }

    const { valid } = await this.validatorAddress(params)

    if (!valid) return

    const res = await reqOrderSubmit(params)

    if (res.code === 200) {
      this.orderNo = res.data
      await this.advancePay()
    }
  }, 500),

  // 获取预付单信息
  async advancePay() {
    try {
      const payParams = await reqPrePayInfo(this.orderNo)

      if (payParams.code === 200) {
        const payInfo = await wx.requestPayment(payParams.data)

        if (payInfo.errMag === 'requestPayment:ok') {
          const payStatus = await reqPayStatus(this.orderNo)

          if (payStatus.code === 200) {
            wx.redirectTo({
              url: '/modules/orderPayModule/pages/order/list/list',
              success: () => {
                wx.toast({
                  title: '支付成功',
                  icon: 'success'
                })
              }
            })
          }
        }
      }
    } catch (error) {
      wx.toast({
        title: '支付失败，请联系客服',
        icon: 'error'
      })
    }
  },

  // 提交订单参数验证
  validatorAddress(params) {

    const nameRegExp = '^[\u4e00-\u9fa5a-zA-Z0-9]+$'
    const phoneReg = '^(?:\\+?86)?1[3-9]\\d{9}$'

    const rules = {
      userAddressId: { required: true, message: '请输入收货地址' },
      buyName: [
        { required: true, message: '请输入订购人姓名' },
        { pattern: nameRegExp, message: '订购人姓名不合法' }
      ],
      buyPhone: [
        { required: true, message: '请输入订购人手机号' },
        { pattern: phoneReg, message: '订购人手机号不合法' }
      ],
      deliveryDate: { required: true, message: '请选择送达日期' },
    }

    const validator = new Schema(rules);

    return new Promise(resolve => validator.validate(params, (errors) => {
      if (errors) {
        wx.toast({ title: errors[0].message})
        resolve({ valid: false })
      } else {
        resolve({ valid: true })
      }
    }))
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
      show: false,
      deliveryDate: formatTime(new Date(event.detail))
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

    const { goodsId, blessing } = this.data
    const { data: orderInfo } = goodsId ? await reqBuyNowGood({ goodsId, blessing }) : await reqOrderInfo()
    const orderGoods = orderInfo.cartVoList.find(item => item.blessing !== '')

    this.setData({
      orderInfo,
      blessing: !orderGoods ? '' : orderGoods.blessing
    })
  },

  onLoad(options) {
    this.setData({ ...options })
  },

  onShow() {
    this.getAddress()
    this.getOrderInfo()
  },

  onUnload() {
    app.globalData.address = {}
  }

})
