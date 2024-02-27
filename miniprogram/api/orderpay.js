import http from '@/utils/http';

// 获取订单详情
export const reqOrderInfo = () => {
  return http.get('/order/trade')
}

// 获取订单详情页面的收货地址
export const reqOrderAddress = () => {
  return http.get('/userAddress/getOrderAddress')
}

// 获取立即购买商品的详细信息
export const reqBuyNowGood = ({ goodsId, ...data }) => {
  return http.get(`/order/buy/${goodsId}`, data)
}

// 提交订单
export const reqOrderSubmit = (data) => {
  return http.post('/order/submitOrder', data)
}

// 获取微信预支付信息
export const reqPrePayInfo = (orderNo) => {
  return http.get(`/wechat/createJsapi/{orderNo}`)
}

// 获取微信支付结果
export const reqPayStatus = (orderNo) => {
  return http.get(`/wechat/queryPayStatus/{orderNo}`)
}

// 获取订单列表
export const reqOrderList = (page, limit) => {
  return http.get(`/order/order/${page}/${limit}`)
}
