import { observable, action } from 'mobx-miniprogram';
import { getStorage } from '../utils/storage';

export const userStore = observable({

  // token 身份令牌
  token: getStorage('token') || '',
  // 用户信息
  userInfo: getStorage('userInfo') || {},

  // 定义 action
  setToken(token) {
    this.token = token
  },
  setUserInfo(userInfo) {
    this.userInfo = userInfo
  }
})
