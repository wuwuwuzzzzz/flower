import { reqIndexData } from '../../api/index';

Page({

  // 初始化数据
  data: {
    // 轮播图数据
    bannerList: [],
    // 商品导航数据
    categoryList: [],
    // 活动渲染区域
    activeList: [],
    // 人气推荐
    hotList: [],
    // 猜你喜欢
    guessList: [],
    loading: true
  },

  // 获取首页数据
  async getIndexData() {

    const res = await reqIndexData()

    this.setData({
      bannerList: res[0].data,
      categoryList: res[1].data,
      activeList: res[2].data,
      hotList: res[3].data,
      guessList: res[4].data,
      loading: false
    })
  },

  // 监听页面加载
  onLoad() {
    this.getIndexData()
  }
  
})
