import http from '../utils/http';

// 新增收货地址
export const reqAddAddress = (data) => {
  return http.post('/userAddress/save', data)
}

// 获取收货地址列表
export const reqAddressList = () => {
  return http.get('/userAddress/findUserAddress')
}

// 获取收获地址详情
export const reqAddressInfo = (id) => {
  return http.get(`/userAddress/${id}`)
}

// 更细 收货地址
export const reqUpdateAddress = (data) => {
  return http.post('/userAddress/update', data)
}

// 删除收获地址
export const reqDelAddress = (id) => {
  return http.get(`/userAddress/delete/${id}`)
}
