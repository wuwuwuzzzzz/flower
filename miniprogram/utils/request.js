class WxRequest {

  // 默认请求参数
  defaults = {
    baseURL: '',
    url: '',
    data: null,
    method: 'GET',
    header: {
      'Content-type': 'application/json'
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

  // 封装 GET 实例方法
  get(url, data = {}, config = {}) {
    return this.request(Object.assign({ url, data, method: 'GET' }, config))
  }

  // 封装 DELETE 实例方法
  delete(url, data = {}, config = {}) {
    return this.request(Object.assign({ url, data, method: 'DELETE' }, config))
  }

  // 封装 POST 实例方法
  post(url, data = {}, config = {}) {
    return this.request(Object.assign({ url, data, method: 'POST' }, config))
  }

  // 封装 PUT 实例方法
  put(url, data = {}, config = {}) {
    return this.request(Object.assign({ url, data, method: 'PUT' }, config))
  }
}

const instance = new WxRequest({
  baseURL: 'https://gmall-prod.atguigu.cn/mall-api',
  timeout: 15000
})

export default instance
