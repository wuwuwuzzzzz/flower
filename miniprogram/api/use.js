import http from '../utils/http';

// 登录操作
export const reqLogin = (code) => http.get(`/weixin/wxLogin/${code}`)

// 获取用户信息
export const reqUserInfo = () => http.get('/weixin/getuserInfo')
