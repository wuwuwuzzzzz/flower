import http from '../utils/http';

// 获取商品列表
export const reqGoodsList = ({ page, limit, ...data }) => {
  return http.get(`/goods/list/${page}/${limit}`, data)
}

// 获取商品详情
export const reqGoodsInfo = (goodsId) => {
  return http.get(`/goods/${goodsId}`)
}
