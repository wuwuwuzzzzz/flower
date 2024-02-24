import http from '../utils/http';

export const reqCategoryData = () => http.get('/index/findCategoryTree')
