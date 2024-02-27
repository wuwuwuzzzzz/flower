import { reqOrderList } from '@/api/orderpay';

Page({

  // 页面的初始数据
  data: {
    orderList: [],
    page: 1,
    limit: 10,
    total: 0,
    isLoading: false,
  },

  // 获取订单列表
  async getOrderList() {

    const { page, limit } = this.data
    this.data.isLoading = true

    const res = await reqOrderList(page, limit)
    this.data.isLoading = false

    if (res.code === 200) {
      this.setData({
        orderList: [...this.data.orderList, ...res.data.records],
        total: res.data.total
      })
    }
  },

  // 下拉加载
  onReachBottom() {

    const { page, total, orderList, isLoading } = this.data

    if (isLoading) return

    if (total === orderList.length) {
      wx.toast({ title: '数据加载完毕' })
      return
    }

    this.setData({
      page: page + 1
    })

    this.getOrderList()
  },

  // 监听页面加载
  onLoad() {
    this.getOrderList()
  }

})
