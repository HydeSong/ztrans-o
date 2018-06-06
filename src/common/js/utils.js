/**
 * 解析URL参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */

export function urlParse () {
  let url = window.location.hash || window.location.href || window.location.search
  // console.log(url)
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let value = decodeURIComponent(tempArr[1]).replace('\'', '')
      obj[key] = value
    })
  }
  return obj
};