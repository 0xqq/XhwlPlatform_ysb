import axios from 'axios'
import {delCookie,getCookie, setSession, getSession, getStore} from '@/script/util'
import router from '@/router/router'
import qs from 'qs'
import apis from '@/config/apis'


// axios 配置
 //var baseUrl = 'https://iot.xhmind.com';
// var baseUrl = 'http://10.51.39.114:3000';
 // var baseUrl = 'http://10.51.36.116:8088';
var baseUrl = apis.main;
console.log(baseUrl);

axios.defaults.timeout = 20000;
axios.defaults.baseURL = baseUrl; //这是调用数据接口
var Content_Type = 'application/json;charset=utf-8';

//http request 拦截器，通过这个，把token传到后台
axios.interceptors.request.use(
      config => {
        if(axios.defaults.baseURL == baseUrl){
            var token = getCookie('privarytoken'); //获取Cookie
            if(token&&token.length!=0){
                token = token.slice(6);
            }
            var projectId = JSON.parse(getStore('projectInfo'));
            if(projectId && projectId.length!=0){
                projectId = projectId.code;
            }
                config.headers = {
//              'Content-Type':'application/json;charset=utf-8',        //不跨域时的请求头
//              'Content-Type':'application/x-www-form-urlencoded;charset=utf-8', //设置跨域头部
                'Content-Type': Content_Type,
                'Stafftoken': token,
                'Itemid': projectId  //项目iD
                };
             //alert(projectId)
         }

         //  console.log(config);
            return config;
       },
       err => {
            return Promise.reject(err);
      }
    );

// http response 拦截器
axios.interceptors.response.use(
      response => {
        //如果返回402（自定义），说明没有token，跳转回登录页
        if(response.data.status == 402){
            // alert(router.currentRoute.fullPath+"呵呵")
            setSession("direct", location.href) //保存重定向之前的地址
            router.push({
                path: '/login',
            })
        }

        //console.log("defaults是： " + axios.defaults.baseURL + "  baseUrl是" + baseUrl)
        if(axios.defaults.baseURL == baseUrl){   //自己后台用的数据格式，先剥一层data
            return response.data;
        }
            return response;

      },
      error => {
        //console.log(error+"err")
            return Promise.reject(error.response)
      });
/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}, newUrl, dataType) {
    if(dataType == 'formdata'){
        params = qs.stringify(params)
    }
    if(newUrl){
        axios.defaults.baseURL = newUrl
        //console.log(axios.defaults.baseURL)
    }else{
        axios.defaults.baseURL = baseUrl
    }
    return new Promise((resolve, reject) => {
          axios.get(url, {
                params: params
          })
          .then(response => {
                resolve(response)
          },err => {
                reject(err)
                axios.defaults.baseURL = baseUrl
          })
    })
}
/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}, newUrl, dataType) {
    if(dataType == 'formdata'){
        data = qs.stringify(data);
        Content_Type = 'application/x-www-form-urlencoded;charset=utf-8';
    }else{
        Content_Type = 'application/json;charset=utf-8';
    }
    if(newUrl){
        axios.defaults.baseURL = newUrl
    }else{
        axios.defaults.baseURL = baseUrl
    }
        return new Promise((resolve, reject) => {

        //console.log(axios.defaults.baseURL)
            axios.post(url, data)
              .then(response => {
                    resolve(response);
              }, err => {
                    reject(err);
              })
      })
}
/**
 * delete 请求方法 (delete保留，不能使用)
 * @param url
 * @param params
 * @returns {Promise}
 */
export function _delete(url, data= {}, newUrl, dataType) {
    if(dataType == 'formdata'){
        data = qs.stringify(data)
    }
      return new Promise((resolve, reject) => {

            axios.delete(url, {
            data: data
            })
            .then(response => {
                  resolve(response);
            },err => {
                  reject(err);
            })
      })
}
 
/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {},newUrl) {
 if(newUrl&&url=='/ssh/wilddog/getToken'){
    axios.defaults.baseURL = newUrl
}else{
        axios.defaults.baseURL = baseUrl; //这是调用数据接口
    }
      return new Promise((resolve, reject) => {
            axios.patch(url, data)
              .then(response => {
                    resolve(response);
              }, err => {
                    reject(err);
              })
      })
}
/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
      return new Promise((resolve, reject) => {
            axios.put(url, data)
              .then(response => {
                    resolve(response);
              }, err => {
                    reject(err);
              })
      })
}