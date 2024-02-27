import QQMapWX from '@/libs/qqmap-wx-jssdk'
import Schema from 'async-validator';
import { reqAddAddress, reqAddressInfo, reqUpdateAddress } from '@/api/address';

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
  async saveAddressForm() {

    const { provinceName, cityName, districtName, address, isDefault } = this.data

    const params = {
      ...this.data,
      fullAddress: provinceName + cityName + districtName + address,
      isDefault: isDefault ? 1 : 0
    }

    const { valid } = await this.validatorAddress(params)

    if (!valid) return

    const res = this.addressId ? await reqUpdateAddress(params) : await reqAddAddress(params)

    if (res.code === 200) {
      wx.navigateBack({
        success: () => {
          wx.toast({ title: this.addressId ? '更新收货地址成功！' : '新增收货地址成功！' })
        }
      })
    }
  },

  // 新增地址参数验证
  validatorAddress(params) {

    const nameRegExp = '^[\u4e00-\u9fa5a-zA-Z0-9]+$'
    const phoneReg = '^(?:\\+?86)?1[3-9]\\d{9}$'

    const rules = {
      name: [
        { required: true, message: '请输入收货人姓名' },
        { pattern: nameRegExp, message: '收货人姓名不合法' }
      ],
      phone: [
        { required: true, message: '请输入收货人手机号' },
        { pattern: phoneReg, message: '收货人手机号不合法' }
      ],
      provinceName: { required: true, message: '请选择收货人所在地区' },
      address: { required: true, message: '请输入详细地址' }
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
    const { latitude, longitude, name } = await wx.chooseLocation()
    this.qqmapwx.reverseGeocoder({
      location: {
        longitude,
        latitude
      },
      success: (res) => {

        const { adcode, province, city, district } = res.result.ad_info
        const { street, street_number } = res.result.address_component
        const { standard_address } = res.result.formatted_address

        this.setData({
          provinceName: province,
          provinceCode: adcode.replace(adcode.substring(2, 6), '0000'),
          cityName: city,
          cityCode: adcode.replace(adcode.substring(4, 6), '00'),
          districtName: district,
          districtCode: district && adcode,
          address: street + street_number + name,
          fullAddress: standard_address + name
        })
      }
    })
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
  },

  //  用来处理更新相关的逻辑
  async showAddressInfo(id) {

    if (!id) return
    this.addressId = id

    wx.setNavigationBarTitle({
      title: '更新收货地址'
    })
    const { data } = await reqAddressInfo(id)

    this.setData(data)
  },

  onLoad(options) {
    this.qqmapwx = new QQMapWX({
      key: 'RGUBZ-SPECB-6ROU3-J4MJE-WYM53-Z7FF3'
    })
    this.showAddressInfo(options.id)
  }

})
