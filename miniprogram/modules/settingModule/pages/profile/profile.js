// pages/profile/profile.js

import { userBehavior } from './behavior';

Page({

  // 注册 behavior
  behaviors: [userBehavior],

  // 页面的初始数据
  data: {
    isShowPopup: false // 控制更新用户昵称的弹框显示与否
  },

  // 显示修改昵称弹框
  onUpdateNickName() {
    this.setData({
      isShowPopup: true
    })
  },

  // 弹框取消按钮
  cancelForm() {
    this.setData({
      isShowPopup: false
    })
  },

  // 更新用户头像
  chooseAvatar(event) {

    const { avatarUrl } = event.detail

    this.setData({
      'userInfo.headimgurl': avatarUrl
    })
  }

})
