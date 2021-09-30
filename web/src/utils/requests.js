import axios from "axios";
import { Component } from "react";
import { message } from "antd";
import {
  getToken,
  TOKEN_PREFIX,
  HttpHeaderAuthorization,
  TOKEN_KEY
} from "./auth";
import { getUrlParam, urlParamDel } from "./urls";
import { hideLoading, showLoading } from "../store";

import lodash from "lodash";

let base =
  process.env.NODE_ENV == "production" ? process.env.REACT_APP_SERVICE_URL : "";

axios.defaults.baseURL = base; 

// 请求前拦截
axios.interceptors.request.use(
  config => {
    showLoading();
    let token = getUrlParam(TOKEN_KEY);
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);

      // 删除url上的token参数
      const newHref = urlParamDel(window.location.href, TOKEN_KEY);
      window.location.href = newHref;
    } else {
      token = localStorage.getItem(TOKEN_KEY);
    }
    // debugger
    config.headers.common[HttpHeaderAuthorization] = TOKEN_PREFIX + token;
    return config;
  },
  err => {
    console.log("请求超时");
    hideLoading();
    return Promise.reject(err);
  }
);

// 返回后拦截
axios.interceptors.response.use(
  resp => {
    hideLoading();
    console.log(resp);
    const { code, msg } = resp.data;

    if (code === "200") {
      return resp.data;
    } else if (code == "401" || code == "401000") {
      console.log("登录信息失效⊙﹏⊙∥");
      message.error("登录信息失效⊙﹏⊙∥");
      const loginUrl = resp.data.data.loginUrl;
      let currentHref = window.location.href;
      if (getUrlParam(TOKEN_KEY)) {
        currentHref = urlParamDel(currentHref, TOKEN_KEY);
      }
      const newHref =
        loginUrl + "?redirectUrl=" + encodeURIComponent(currentHref);
      console.log(loginUrl);
      console.log(newHref);
      window.location.href = newHref;
      return Promise.reject("登录信息失效⊙﹏⊙∥");
    } else {
      message.error(msg);
      return Promise.reject(msg);
    }
  },
  err => {
    hideLoading();
    console.log(JSON.parse(JSON.stringify(err)));
    // console.log(typeof err);
    message.error("服务器开小差了⊙﹏⊙∥");
    console.log("服务器开小差了⊙﹏⊙∥");
    return Promise.reject(err);
  }
);

// @RequestBody请求
const postRequestBody = (url, params) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8"
    }
  });
};

// @RequsetParam请求
const postRequestParam = (url, params) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

const get = url => {
  return axios({
    method: "get",
    url: `${base}${url}`
  });
};

const getUrlParams = (url, params) => {
  return axios({
    method: "get",
    url: `${base}${url}`,
    params: params
  });
};

const multiple = function(requsetArray, callback) {
  axios.all(requsetArray).then(axios.spread(callback));
};

const http = {
  axios,
  get,
  getUrlParams,
  postRequestParam,
  postRequestBody
};

Component.prototype.get = get;
Component.prototype.get = getUrlParams;
Component.prototype.postRequestBody = postRequestBody;
Component.prototype.postRequestParam = postRequestParam;
Component.prototype.multiple = multiple;

export default http;
