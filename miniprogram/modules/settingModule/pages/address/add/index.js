Page({

  // 页面的初始数据
  data: {
    // 收货人
    name: '',
    // 手机号码
    phone: '',
    // 省
    provinceName: '',
    // 省编码
    provinceCode: '',
    // 市
    cityName: '',
    // 市编码
    cityCode: '',
    // 区
    districtName: '',
    // 区编码
    districtCode: '',
    // 详细地址
    address: '',
    // 完整地址
    fullAddress: '',
    // 是否设置为默认地址
    isDefault: false
  },

  // 保存收货地址
  saveAddressForm(event) {

    const { provinceName, cityName, districtName, address, isDefault } = this.data
    const params = {
      ...this.data,
      fullAddress: provinceName + cityName + districtName + address,
      isDefault: isDefault ? 1 : 0
    }
  },

  // 省市区选择
  onAddressChange(event) {

    const [provinceName, cityName, districtName] = event.detail.value
    const [provinceCode, cityCode, districtCode] = event.detail.code

    this.setData({
      provinceName,
      cityName,
      districtName,
      provinceCode,
      cityCode,
      districtCode
    })
  },

  // 获取用户地理位置信息
  async onLocation() {
    const res = await wx.getLocation()
    console.log(res)
  },

  // wx.getLocation 获取用户地理位置
  async getLocation() {

    // 获取用户所有的授权信息
    const { authSetting } = await wx.getSetting()

    if (authSetting['scope.userLocation']) {
      try {
        const res = await wx.getLocation({})
      } catch (err) {
        wx.toast({ title: '您拒绝授权获取位置信息' })
      }
    } else {
      const modalRes = wx.modal({
        title: '授权提示',
        content: '需要获取地理位置信息，请确认授权'
      })

      if (!modalRes) return wx.toast({ title: '您拒绝了授权' })

      const { authSetting } = await wx.openSetting()

      if (!authSetting['scope.userLocation']) return wx.toast({ title: '授权失败' })

      try {
        await wx.getLocation({})
      } catch (err) {
        wx.toast({ title: '您拒绝授权获取位置信息' })
      }
    }
  }

})
