class WxRequest {

  // 默认请求参数
  defaults = {
    baseURL: '',
    url: '',
    data: null,
    method: 'GET',
    header: {
      "Content-type": 'application/json'
    },
    timeout: 60000
  }

  constructor(params = {}) {
    this.defaults = Object.assign({}, this.defaults, params)
  }

  request(options) {

    options.url = this.defaults.baseURL = options.url
    options = { ...this.defaults, ...options }

    return new Promise((resolve, reject) => {
      wx.request({
        ...options,
        success: (res) => {
          resolve(res)
        },
        fail: (res) => {
          reject(res)
        }
      })
    })
  }
}

const instance = new WxRequest({
  baseURL: 'https://gmall-prod.atguigu.cn/mall-api',
  timeout: 15000
})

export default instance
