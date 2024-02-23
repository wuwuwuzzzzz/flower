import WxRequest from './request';
import { clearStorage, getStorage } from './storage';
import { modal, toast } from './extendApi';

// 对 WxRequest 进行实例化
const instance = new WxRequest({
  baseURL: 'https://gmall-prod.atguigu.cn/mall-api',
  timeout: 15000
})

// 配置请求拦截器
instance.interceptor.request = (config) => {
  const token = getStorage('token')

  if (token) {
    config.header['token'] = token
  }

  return config
}

// 配置响应拦截器
instance.interceptor.response = async (response) => {

  const { isSuccess, data } = response

  if (!isSuccess) {
    wx.showToast({
      title: '网络一场请重试',
      icon: 'error'
    })

    return response
  }

  switch (data.code) {

    case 200:

      return data

    case 208:

      const res = await modal({
        content: '鉴权失败，请重新登录',
        showCancel: false
      })

      if (res) {

        clearStorage()

        wx.navigateTo({
          url: '/pages/login/login'
        })
      }

      return Promise.reject(response)

    default:

      toast({
        title: '程序出现异常，请联系客服或稍后重试'
      })

      return Promise.reject(response)
  }
}
