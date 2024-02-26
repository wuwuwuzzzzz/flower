// pages/address/list/index.js
import { reqAddressList } from '../../../../../api/address';

Page({

  // 页面的初始数据
  data: {
    addressList: []
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

  onShow() {
    this.getAddressList()
  }
})
