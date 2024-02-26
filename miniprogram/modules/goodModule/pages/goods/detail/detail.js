// pages/goods/detail/index.js
import { reqGoodsInfo } from '@/api/goods';
import { userBehavior } from '@/behaviors/userbehavior';
import { reqAddCart, reqCartList } from '../../../../../api/cart';

Page({

  behaviors: [userBehavior],

  // 页面的初始数据
  data: {
    // 商品详情
	  goodsInfo: {},
    // 控制加入购物车和立即购买弹框的显示
    show: false,
    // 商品购买数量，默认是 1
    count: 1,
    // 祝福语
    blessing: '',
    // 0 加入购物车 1 立即购买
    buyNow: 0,
    // 商品购买数量
    allCount: 0
  },

  // 全屏预览图片
  previewImage() {
    wx.previewImage({
      urls: this.data.goodsInfo.detailList
    })
  },

  // 加入购物车
  handleAddcart() {
    this.setData({
      show: true,
      buyNow: 0
    })
  },

  // 立即购买
  handeGotoBuy() {
    this.setData({
      show: true,
      buyNow: 1
    })
  },

  // 点击关闭弹框时触发的回调
  onClose() {
    this.setData({ show: false })
  },

  // 监听是否更改了购买数量
  onChangeGoodsCount(event) {
    this.setData({
      count: Number(event.detail)
    })
  },

  // 确定按钮回调
  async handleSubmit() {

    const { token, count, blessing, buyNow } = this.data
    const goodsId = this.goodsId

    if (!token) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return
    }

    if (buyNow === 0) {
      const res = await reqAddCart({ goodsId, count, blessing })
      if (res.code === 200) {
        wx.toast({ title: '加入购物车成功' })
        await this.getCartCount()
        this.setData({ show: false })
      }
    } else {
      wx.navigateTo({
        url: `/pages/order/detail/detail?goodsId=${goodsId}&blessing=${blessing}`
      })
    }
  },

  // 获取商品详情
  async getGoodsInfo() {
    const { data: goodsInfo } = await reqGoodsInfo(this.goodsId)
    this.setData({
      goodsInfo
    })
  },

  // 获取购物车商品数量
  async getCartCount() {
    if (!this.data.token) return
    const res = await reqCartList()
    if (res.data.length !== 0) {
      let allCount = 0
      res.data.forEach(item => allCount+=item.count)
      this.setData({ allCount: (allCount > 99 ? '99+' : allCount) })
    }
  },

  onLoad(options) {
    this.goodsId = options.goodsId
    this.getGoodsInfo()
    this.getCartCount()
  }

})
