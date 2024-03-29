// pages/address/list/index.js
import { reqAddressList, reqDelAddress } from '../../../api/address';
import { swiperCellBehavior } from '@/behaviors/swiperCell';

// 获取应用实例
const app = getApp()

Page({

  behaviors: [swiperCellBehavior],

  // 页面的初始数据
  data: {
    addressList: [],
  },

  // 删除收货地址
  async delAddress(event) {

    const { id } = event.currentTarget.dataset

    const modalRes = await wx.modal({
      content: '您确认删除该收货地址吗？'
    })

    if (modalRes) {
      await reqDelAddress(id)
      wx.toast({ title: '收货地址删除成功' })
      await this.getAddressList()
    }
  },

  // 去编辑页面
  toEdit(event) {

    const { id } = event.currentTarget.dataset

    wx.navigateTo({
      url: `/modules/settingModule/pages/address/add/index?id=${id}`
    })
  },

  // 获取收货地址列表数据
  async getAddressList() {
    const { data: addressList } = await reqAddressList()
    this.setData({ addressList })
  },

  // 更新收货地址
  changeAddress(event) {
    if (this.flag !== '1') return
    const addressId = event.currentTarget.dataset.id
    const selectAddress = this.data.addressList.find(item => item.id === addressId)

    if (selectAddress) {
      app.globalData.address = selectAddress
      wx.navigateBack()
    }
  },

  onShow() {
    this.getAddressList()
  },

  onLoad(options) {
    this.flag = options.flag
  }
})
