import Axios from 'axios';
import { message } from 'antd';
import CookieStorage from '@@utils/cookiestorage';
import { BaseURl } from './ipconfig'

// 请求队列
const fetchQueue = {}
// 是否开启请求锁。
const fetchLock = true

const env = process.env.NODE_ENV
const isProd = env === 'prod'

// 创建Axios实例
const Axios_instance = Axios.create({
  // baseURL: BaseURl.ipCommon, // process.env.BASE_URL || 'http://localhost:3681',
  
  // 是否跨域携带cookie
  withCredentials: true,

  // 请求超时
  timeout: 3000,
  headers: {
    'cache-control': 'no-cache',
  }
});

const StreamPost = (config) => {
  const url = config.url
  const data = JSON.parse(config.data)
  const form = document.createElement('form')
  form.action = url
  form.method = 'post'
  form.style.display = 'none'
  Object.keys(data).forEach(key => {
      const input = document.createElement('input')
      input.name = key
      input.value = data[key]
      form.appendChild(input)
  })
  const button = document.createElement('input')
  button.type = 'submit'
  form.appendChild(button)
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

const StreamGet = (config) => {
  const params = []
  for (const item in config.params) {
      params.push(`${item}=${config.params[item]}`)
  }
  const url = params.length ? `${config.url}?${params.join('&')}` : `${config.url}`
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
      document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

function responseLock (config) {
  // 移除出请求队列
  delete fetchQueue[config.url]
  delete fetchQueue[config.baseURL + config.url]
}

// 设置请求拦截器
Axios_instance.interceptors.request.use(config => {
  // message.loading('加载中', 3)  // loading组件，显示文字加载中，自动关闭延时3s

  // 去除没有值的属性
  for (const key in config.data) {
    const val = config.data[key]
    if (val === undefined || val === '' || val == null) {
      delete config.data[key]
    }
  }
  // get传参
  // if (config.method === 'get' && config.data && Object.keys(config.data).length) {
  //   config.url += `?${qs.stringify(config.data)}`
  // }

  // 判断是否存在token，如果存在的话，则每个http header都加上token
  // if (config.usetoken) {
  //   console.log('usetoken:', config.usetoken)
  //   // config.defaults.headers.common.Authorization = `Bearer ${userCookieToken}`;
  //   config.headers.Authorization = `Bearer ${config.usetoken}`;
  //   Reflect.deleteProperty(config, 'usetoken');
  // }

  // 请求锁
  const lock = config.fetchLock !== undefined && config.fetchLock !== null ? config.fetchLock : fetchLock
  if (lock) {
    // 如果有同个请求在队列中，则取消即将发送的请求
    if (fetchQueue[config.baseURL + config.url]) {
      config.cancelToken = new Axios.CancelToken((c) => {
        c(`cancel ${config.url}`)
      })
    } else {
      // 添加入请求队列
      fetchQueue[config.baseURL + config.url] = 1
    }
  }
  
  //处理请求之前的配置
  console.log('interceptors_config:', config)
  return config;
}, err => {
  // 请求错误处理
  !isProd && console.log('request_err:', err)
  return Promise.reject(err)
})

// 设置响应拦截器
Axios_instance.interceptors.response.use(response => {
  responseLock(response.config)
  // 处理字节流
  if (response.headers && response.headers['content-type'] === 'application/octet-stream') {
      const config = response.config
      if (config.method === 'post') {
        StreamPost(config)
      } else if (config.method === 'get') {
        StreamGet(config)
      }
      return
  } else {
      // message.destroy()  // 销毁message组件
      if (response.data.access_token) {
        CookieStorage.setCookie('user_token', response.data.access_token);
      }
      //处理响应数据
      !isProd && console.log('interceptors.res:', response)
      return response;
  }
}, error => {
    if (error.config) {
      responseLock(error.config)
    }
    if (error.response) {
        // const ErrRes = error.response
        const { status, data } = error.response
        !isProd && console.log("interceptors.err:", status, error.config)
        
        switch (status) {
          case 401:
              // 返回 401 清除过期token信息并跳转到登录页面
              // CookieStorage.delCookie('user_token');
              // CookieStorage.delCookie('username');
              message.error('用户没有权限访问，请先登录！', 3);
              console.log("interceptors.err-data:", data)
              if (data.loginurl && typeof window !== 'undefined') {
                window.location.href = `http://localhost:3601${data.loginurl}`
              }
              break;
          case 403:
              CookieStorage.delCookie('user_token');
              message.error(error + ', 该服务资源无权限访问！', 5);
              break;
          default:
              break;
        }
    }
    //处理响应失败
    return Promise.reject(error.response || error.message) // 返回接口返回的错误信息
});

export default function Fetch(options) {
    // 是否添加token
    // if (options.usetoken) {
    //   options.headers = {
    //     Authorization: `Bearer ${CookieStorage.getTokenCookie('user_token')}`,
    //   };
    // }

  // console.log('Axios_0:', options)
  return Axios_instance(options)
    .then(response => {
      
      const { status, data, error } = response;
      const success = status === 200 ? true : false;
      if (!success && typeof window !== 'undefined') {
        message.error(error +', 请求失败！');
      }
      // console.log('Axios_1:', data)
      // if (status === 401) { 
      //     CookieStorage.delCookie('user_token');
      //     CookieStorage.delCookie('username');
      //     message.error('用户没有权限，请先登录！', 3);
      //     if (data.loginurl) {
      //       window.location.href = `${data.loginurl}`
      //     }
      // }

      return Promise.resolve({
        ...data,
      });
    })
    .catch(error => {
      // if (typeof window !== 'undefined') {
      //   // message.error(error || 'Network Error');
      //   throw error
      // }
      return Promise.reject(error);
    });
}