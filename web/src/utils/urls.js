export function getUrlParam(key) {
  // debugger;
  let url = new URL(window.location.href)
  return url.searchParams.get(key)
  // var after = window.location.search;
  // if (after.indexOf("?") === -1) {
  //   //key存在先通过search取值如果取不到就通过hash来取
  //   after = after.substr(1) || window.location.hash.split("?")[1];
  // }
  // if (after) {
  //   var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  //   var r = after.match(reg);
  //   if (r != null) {
  //     return decodeURIComponent(r[2]);
  //   } else {
  //     return null;
  //   }
  // }
}

export function urlParamDel(_url, key) {

  let url = new URL(_url)
  url.searchParams.delete(key)
  return url.toString()

  /* var urlArr = url.split("?");
  if (urlArr.length > 1 && urlArr[1].indexOf(name) > -1) {
    var query = urlArr[1];
    var obj = {};
    var arr = query.split("&");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      obj[arr[i][0]] = arr[i][1];
    }
    delete obj[name];
    const params = JSON.stringify(obj)
      .replace(/[\"\{\}]/g, "")
      .replace(/\:/g, "=")
      .replace(/\,/g, "&");
    var urlte;
    if (params) {
      urlte = urlArr[0] + "?" + params;
    } else {
      urlte = urlArr[0];
    }

    return urlte;
  } else {
    return url;
  } */
}


export function getParam(url, name){
  let v = getUrlParam(name)
  if(!v){
    let _url = new URL(url);
    let hashParams = new URLSearchParams(_url.hash)
    v = hashParams.get(name)
  }

  return v
}

export function hashParamDel(url, name) {
  let _url = new URL(url);
  let hashParams = new URLSearchParams(_url.hash)
  hashParams.delete(name)
  _url.hash = decodeURIComponent(hashParams.toString())
  return _url.toString()
}