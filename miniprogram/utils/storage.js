/**
 * @description     存储数据
 * @param {*} key   本地缓存中指定的 key
 * @param {*} value 需要缓存的数据
 */
export const setStorage = (key, value) => {
  try {
    wx.setStorageSync('key', value)
  } catch (error) {
    console.log(`存储指定 ${ key } 数据发生了异常`, error);
  }
}

/**
 * @description   读取数据
 * @param {*} key 本地缓存中指定的 key
 */
export const getStorage = (key) => {
  try {
    wx.getStorageSync('key')
  } catch (error) {
    console.log(`读取指定 ${ key } 数据发生了异常`, error);
  }
}

/**
 * @description   移除数据
 * @param {*} key 本地缓存中指定的 key 的数据
 */
export const removeStorage = (key) => {
  try  {
    wx.removeStorageSync('key')
  } catch (error) {
    console.log(`移除指定 ${ key } 数据发生了异常`, error);
  }
}

/**
 * @description 清空数据
 */
export const clearStorage = () => {
  try  {
    wx.clearStorageSync()
  } catch (error) {
    console.log(`清空数据发生了异常`, error);
  }
}
