// pages/login/login.js

import { toast } from '@/utils/extendApi';
import { reqLogin, reqUserInfo } from '@/api/use';
import { setStorage } from '@/utils/storage';
import { ComponentWithStore } from 'mobx-miniprogram-bindings';
import { userStore } from '@/stores/userStore';
import { debounce } from 'miniprogram-licia'

ComponentWithStore({

  storeBindings: {
    store: userStore,
    fields: ['token', 'userInfo'],
    actions: ['setToken', 'setUserInfo']
  },

  methods: {
    // 授权登录
    login: debounce(function () {
      wx.login({
        success: async ({ code }) => {
          if (code) {
            const { data } = await reqLogin()
            setStorage('token', data.token)
            this.setToken(data.token)
            this.getuserInfo()
            wx.navigateBack()
          } else {
            toast({ title: '授权失败，请重新授权' })
          }
        }
      })
    }, 500),

    // 获取用户信息
    async getuserInfo() {
      const { data } = await reqUserInfo()
      setStorage('userInfo', data)
      this.setUserInfo(data)
    }
  }
})
