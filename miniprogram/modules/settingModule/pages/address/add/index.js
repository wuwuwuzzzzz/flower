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
    isDefault: 0
  },

  // 保存收货地址
  saveAddressForm(event) {
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
  }

})
