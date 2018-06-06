/* @2018.1.5
 *  setCookie: 设置 cookie
 *  getCookie: 获取 cookie
 *  delCookie: 删除 cookie
 *  clearAllCookie: 清除所有 cookie
 */

export function setCookie (name, value, minutes = 60 * 24) {
  // 默认cookie保留1天
  let exp = new Date()
  exp.setTime(exp.getTime() + minutes * 60 * 1000)
  document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()};path=/`
}

export function getCookie (name) {
  let arr = []
  let reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}

export function delCookie (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) {
    document.cookie = `${name}=${cval};expires=${exp.toGMTString()};path=/`
  }
}

export function clearAllCookie () {
  let keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie = `${keys[i]}=0;expires=${new Date(0).toGMTString()}`
    }
  }
}
