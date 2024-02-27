// pages/goods/list/index.js

import { reqGoodsList } from '@/api/goods';

Page({

  // 页面的初始数据
  data: {
    // 商品列表数据
    goodsList: [],
    // 数据总条数
    total: 0,
    // 判断数据是否加载完毕
    isFinish: false,
    // 判断数据是否加载完成
    isLoading: false,
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
    this.data.isLoading = true
    const { data } = await reqGoodsList(this.data.requestData)
    this.data.isLoading = false
    this.setData({
      goodsList: [...this.data.goodsList, ...data.records],
      total: data.total
    })
  },

  // 监听页面上拉
  onReachBottom() {
    const { goodsList, total, requestData, isLoading} = this.data
    const { page } = requestData
    if (isLoading) return;
    if (goodsList.length === total) {
      this.setData({ isFinish: true })
      return
    }
    this.setData({
      requestData: { ...this.data.requestData, page: page + 1 }
    })
    this.getGoodsList()
  },

  // 监听页面下拉舒心
  onPullDownRefresh() {
    this.setData({
      goodList: [],
      total: 0,
      isFinish: false,
      requestData: { ...this.data.requestData, page: 1 }
    })
    this.getGoodsList()
    wx.stopPullDownRefresh()
  },

  // 监听页面加载
  onLoad(options) {
    Object.assign(this.data.requestData, options)
    this.getGoodsList()
  },

  // 转发功能
  onShareAppMessage(options) {},

  // 分享朋友圈
  onShareTimeline() {}

})
