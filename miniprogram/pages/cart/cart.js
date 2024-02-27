import { ComponentWithStore } from 'mobx-miniprogram-bindings';
import { userStore } from '@/stores/userStore';
import { reqCartList, reqCheckAllStatus, reqUpdateChecked, reqAddCart } from '@/api/cart';
import { debounce } from 'miniprogram-licia'
import { swiperCellBehavior } from '@/behaviors/swiperCell';
import { reqDelCartGoods } from '../../api/cart';

const computedBehavior = require('miniprogram-computed').behavior

ComponentWithStore({

  // 注册 behavior
  behaviors: [swiperCellBehavior, computedBehavior],

  // 组件的属性列表
  storeBindings: {
    store: userStore,
    fields: ['token']
  },

  // 计算属性
  computed: {
    // 全选
    selectAllStatus(data) {
      return data.cartList.length !== 0 && data.cartList.every(item => item.isChecked === 1)
    },
    // 订单总金额
    totalPrice(data) {
      let totalPrice = 0
      data.cartList.forEach(item => {
        if (item.isChecked === 1) {
          totalPrice += item.price * item.count
        }
      })
      return totalPrice
    }
  },

  // 组件的初始数据
  data: {
    cartList: [],
    emptyDes: '还没有添加商品，快去添加吧～'
  },

  // 组件的方法列表
  methods: {
    // 更新购买的数量
    changeBuyNum: debounce(async function(event) {
      const newBuyNum = event.detail > 200 ? 200 : event.detail
      const { id, index, oldbuynum } = event.target.dataset
      const reg = /^([1-9]|[1-9]\d|1\d{2}|200)$/
      const regRes = reg.test(newBuyNum)

      if (!regRes) {
        this.setData({
          [`cartList[${index}]`.count]: oldbuynum
        })
        return
      }

      const disCount = newBuyNum - oldbuynum

      if (disCount === 0) return

      const res = await reqAddCart({ goodsId: id, count: disCount })

      if (res.code === 200) {
        this.setData({
          [`cartList[${index}]`.count]: newBuyNum,
          [`cartList[${index}]`.isChecked]: 1
        })
      }

    }, 500),
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

    // 删除购物车中的商品
    async delCartGoods(event) {

      const { id } = event.currentTarget.dataset

      const modalRes = await wx.modal({
        content: '您确认删除该商品吗？'
      })

      if (modalRes) {
        await reqDelCartGoods(id)
        await this.showTipGetList()
      }
    },

    onShow() {
      this.showTipGetList()
    },

    onHide() {
      this.onSwiperCellCommonClick()
    }
  }

})
