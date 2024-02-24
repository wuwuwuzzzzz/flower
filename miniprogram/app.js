import './utils/extendApi'

App({
  onShow(options) {
    // 获取当前小程序的账号信息
    const accountInfo = wx.getAccountInfoSync();
    console.log(accountInfo)
  }
})
