// pages/login/login.js

import { toast } from '../../utils/extendApi';
import { reqLogin } from '../../api/use';
import { setStorage } from '../../utils/storage';

Page({
  // 授权登录
  login() {
    wx.login({
      success: async ({ code }) => {
        if (code) {
          const { data } = await reqLogin()
          setStorage('token', data.token)
        } else {
          toast({ title: '授权失败，请重新授权' })
        }
      }
    })
  }
})
