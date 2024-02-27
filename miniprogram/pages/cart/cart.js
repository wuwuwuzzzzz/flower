import { ComponentWithStore } from 'mobx-miniprogram-bindings';
import { userStore } from '@/stores/userStore';
import { reqCartList, reqCheckAllStatus, reqUpdateChecked } from '../../api/cart';
const computedBehavior = require('miniprogram-computed').behavior

ComponentWithStore({

  // 注册 behavior
  behaviors: [computedBehavior],

  // 组件的属性列表
  storeBindings: {
    store: userStore,
    fields: ['token']
  },

  // 计算属性
  computed: {
    selectAllStatus(data) {
      return data.cartList.length !== 0 && data.cartList.every(item => item.isChecked === 1)
    }
  },

  // 组件的初始数据
  data: {
    cartList: [],
    emptyDes: '还没有添加商品，快去添加吧～'
  },

  // 组件的方法列表
  methods: {
    // 全选和全不选
    async selectAllStatus(event) {
      const { detail } = event
      const isChecked = detail ? 1 : 0
      const res = await reqCheckAllStatus(isChecked)

      if (res.code === 200) {
        const newCartList = JSON.parse(JSON.stringify(this.data.cartList))
        newCartList.forEach(item => item.isChecked = isChecked)
        this.setData({ cartList: newCartList })
      }
    },
    // 更新商品购买状态
    async updateChecked(event) {

      const { detail } = event
      const { id, index } = event.target.dataset
      const isChecked = detail ? 1 : 0

      const res = await reqUpdateChecked(id, isChecked)

      if (res.code === 200) {
        await this.showTipGetList()
      }
    },

    // 展示文案信息
    async showTipGetList() {
      const { token } = this.data
      if (!token) {
        this.setData({
          emptyDes: '您尚未登录，点击登录获取更多权益',
          cartList: []
        })
      } else {
        const { code, data: cartList } = await reqCartList()
        if (code === 200) {
          this.setData({
            cartList,
            emptyDes: cartList.length === 0 && '还没有添加商品，快去添加吧～'
          })
        }
      }
    },

    onShow() {
      this.showTipGetList()
    }
  }

})
