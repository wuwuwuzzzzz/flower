import { reqCategoryData } from '../../api/category';

Page({

  // 初始化数据
  data: {
    // 商品分类列表数据
    categoryList: [],
    // 被激活索引
    activeIndex: 0
  },

  // 实现一级分类的切换效果
  updateActive(event) {

    const { index } = event.currentTarget.dataset

    this.setData({
      activeIndex: index
    })
  },

  // 获取商品分类的数据
  async getCategoryData() {

    const res = await reqCategoryData()

    this.setData({
      categoryList: res.data
    })
  },

  // 监听页面的加载
  onLoad() {
    this.getCategoryData()
  }

})
