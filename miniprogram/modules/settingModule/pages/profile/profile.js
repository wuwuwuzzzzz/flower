// pages/profile/profile.js

import { userBehavior } from './behavior';
import { reqUpdateUserInfo, reqUploadFile } from '../../../../api/use';
import { setStorage } from '../../../../utils/storage';
import { toast } from '../../../../utils/extendApi';

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
      isShowPopup: true,
      'userInfo.nickname': this.data.userInfo.nickname
    })
  },

  // 弹框取消按钮
  cancelForm() {
    this.setData({
      isShowPopup: false
    })
  },

  // 更新用户头像
  async chooseAvatar(event) {

    const { avatarUrl } = event.detail
    const res = await reqUploadFile(avatarUrl, 'file')

    this.setData({
      'userInfo.headimgurl': res.data
    })
  },

  // 更新用户信息
  async updateUserInfo() {
    const res = await reqUpdateUserInfo(this.data.userInfo)
    if (res.code === 200) {
      setStorage('userInfo', this.data.userInfo)
      this.setUserInfo(this.data.userInfo)
      toast({ title: '用户信息更新成功' })
    }
  },

  // 获取用户昵称
  getNickName(event) {

    const { nickname } = event.detail.value

    this.setData({
      'userInfo.nickname': nickname,
      isShowPopup: false
    })
  }

})
