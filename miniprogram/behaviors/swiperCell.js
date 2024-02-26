export const swiperCellBehavior = Behavior({

  data: {
    swiperCellQueue: []
  },

  methods: {
    // 打开滑块回调
    swiperCellOpen(event) {
      const instance = this.selectComponent(`#${event.target.id}`)
      this.data.swiperCellQueue.push(instance)
    },

    // 页面点击事件
    onSwiperCellPage() {
      this.onSwiperCellCommonClick()
    },

    // 滑块点击事件
    onSwiperCellClick() {
      this.onSwiperCellCommonClick()
    },

    // 关掉滑块
    onSwiperCellCommonClick() {
      this.data.swiperCellQueue.forEach(item => {
        item.close()
      })
      this.data.swiperCellQueue = []
    },
  }

})
