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
    timeout: 60000,
    isLoading: true
  }

  // 拦截器
  interceptor = {
    request: (config) => config,
    response: (response) => response
  }

  // 数组队列
  queue = []

  constructor(params = {}) {
    this.defaults = Object.assign({}, this.defaults, params)
  }

  request(options) {

    this.timerId && clearTimeout(this.timerId)
    options.url = this.defaults.baseURL + options.url
    options = { ...this.defaults, ...options }
    if (options.isLoading && options.method !== 'UPLOAD') {
      this.queue.length === 0 && wx.showLoading({ title: '加载中' })
      this.queue.push('request')
    }
    options = this.interceptor.request(options)

    return new Promise((resolve, reject) => {
      if (options.method === 'UPLOAD') {
        wx.uploadFile({
          ...options,
          success: (res) => {
            res.data = JSON.parse(res.data)
            const mergeRes = Object.assign({}, res, { config: options, isSuccess: true })
            resolve(this.interceptor.response(mergeRes))
          },
          fail: (err) => {
            const mergeErr = Object.assign({}, err, { config: options, isSuccess: false })
            reject(this.interceptor.response(mergeErr))
          }
        })
      } else {
        wx.request({
          ...options,
          success: (res) => {
            const mergeRes = Object.assign({}, res, { config: options, isSuccess: true })
            resolve(this.interceptor.response(mergeRes))
          },
          fail: (res) => {
            const mergeErr = Object.assign({}, res, { config: options, isSuccess: false })
            reject(this.interceptor.response(mergeErr))
          },
          complete: (res) => {
            if (options.isLoading) {
              this.queue.pop()
              this.queue.length === 0 && this.queue.push('request')

              this.timerId = setTimeout(() => {
                this.queue.pop()
                this.queue.length === 0 && wx.hideLoading()
                clearTimeout(this.timerId)
              }, 1)
            }
          }
        })
      }
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

  // 处理并发请求
  all(promise) {
    return Promise.all([...promise])
  }

  // 上传文件
  upload(url, filePath, name = 'file', config = {}) {
    return this.request(Object.assign({ url, filePath, name, method: 'UPLOAD' }, config))
  }
}

export default WxRequest
