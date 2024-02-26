// pages/goods/list/index.js

import { reqGoodsList } from '../../../../../api/goods';

Page({

  // 页面的初始数据
  data: {
    // 商品列表数据
    goodsList: [],
    // 数据总条数
    total: 0,
    // 判断数据是否加载完毕
    isFinish: false,
    // 商品列表请求参数
    requestData: {
      page: 1,
      limit: 10,
      category1Id: '',
      category2Id: ''
    }
  },

  // 获取商品列表数据
  async getGoodsList() {
    const { data } = await reqGoodsList(this.data.requestData)
    this.setData({
      goodsList: [...this.data.goodsList, ...data.records],
      total: data.total
    })
  },

  // 监听页面上拉
  onReachBottom() {
    const { goodsList, total, requestData } = this.data
    const { page } = requestData
    if (goodsList.length === total) {
      this.setData({ isFinish: true })
      return
    }
    this.setData({
      requestData: { ...this.data.requestData, page: page + 1 }
    })
    this.getGoodsList()
  },

  onLoad(options) {
    Object.assign(this.data.requestData, options)
    this.getGoodsList()
  }

})
