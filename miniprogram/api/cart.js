import http from '../utils/http';

// 加入购物车
export const reqAddCart = ({ goodsId, count, ...data }) => {
  return http.get(`/cart/addToCart/${goodsId}/${count}`, data)
}

// 获取购物车列表
export const reqCartList = () => {
  return http.get('/cart/getCartList')
}

// 更新商品选中的状态
export const reqUpdateChecked = (goodsId, isChecked) => {
  return http.get(`/cart/checkCart/${goodsId}/${isChecked}`)
}

// 全选和全不选
export const reqCheckAllStatus = (isChecked) => {
  return http.get(`/cart/checkAllCart/${isChecked}`)
}

// 删除购物车商品
export const reqDelCartGoods = (goodsId) => {
  return http.get(`/cart/delete/${goodsId}`)
}
