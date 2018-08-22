/**
 * 解析URL参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */

export function urlParse (window) {
  let url = window.location.search
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
}

/**
 * 数组对象去重
 * @param arr
 * @returns {*[]}
 */
export function unique(arr) {
  var res = [arr[0]];
  for (var i = 0; i < arr.length; i++) {
    var repeat = false;
    for (let j = 0; j < res.length; j++) {
      if (isObjectValueEqual(arr[i], res[j])) {
        repeat = true;
        break;
      }
    }
    if (!repeat) {
      res.push(arr[i]);
    }
  }
  return res;
}

/**
 * 判断两对象是否相等
 */
function isObjectValueEqual(a, b) {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);
  if (aProps.length != bProps.length) {
    return false;
  }
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];
    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
}