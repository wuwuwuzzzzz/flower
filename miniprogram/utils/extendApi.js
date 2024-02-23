// 消息提示
const toast = ({ title = '数据加载中...', icon = 'none', duration = 2000, mask = true } = {}) => {
  wx.showToast({
    title,
    icon,
    duration,
    mask
  })
}

wx.toast = toast

export {
  toast
}