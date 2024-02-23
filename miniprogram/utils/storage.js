/**
 * @description    存储数据
 * @param {*} key  本地缓存中指定的 key
 * @param {*} data 需要缓存的数据
 */
export const setStorage = (key, data) => {
  try {
    wx.setStorageSync('key', data)
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
    return wx.getStorageSync('key')
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

/**
 * @description    异步将数据存储到本地
 * @param {*} key  本地缓存中指定的 key
 * @param {*} data 需要缓存的数据
 */
export const asyncSetStorage = (key, data) => {
  return new Promise((resolve) => {
    wx.setStorage({
      key,
      data,
      complete(res) {
        resolve(res)
      }
    })
  })
}

/**
 * @description   异步从本地获取指定 key 的数据
 * @param {*} key 本地缓存中指定的 key
 */
export const asyncGetStorage = (key) => {
  return new Promise((resolve) => {
    return wx.getStorage({
      key,
      complete(res) {
        resolve(res)
      }
    })
  })
}

/**
 * @description   异步从本地移除指定 key 的数据
 * @param {*} key 本地缓存中指定的 key
 */
export const asyncRemoveStorage = (key) => {
  return new Promise((resolve) => {
    wx.removeStorage({
      key,
      complete(res) {
        resolve(res)
      }
    })
  })
}

/**
 * @description 异步从本地清除数据
 */
export const asyncClearStorage = () => {
  return new Promise((resolve) => {
    wx.clearStorage({
      complete(res) {
        resolve(res)
      }
    })
  })
}
