import http from 'axios';
import urlUtil from 'url';
import { util } from './util';
import { getCookie } from './cookie-util';
import querystring from 'querystring';

const CancelToken = http.CancelToken;

let cancelTokenSourceMap = {};

/**
 * 往url中添加query参数
 * @param url
 * @param query
 * @returns {*}
 */
function addQueryToUrl (url, query) {
  if (typeof url !== 'string') return '';

  if (url.indexOf('http') === -1) {
    url = window.location.origin + url;
  }

  const urlObj = new URL(url);
  if (typeof query === 'string') {
    query = querystring.parse(query);
  }
  for (const key in query) {
    if (!Object.prototype.hasOwnProperty.call(query, key)) continue;

    urlObj.searchParams.set(key, query[key]);
  }
  return urlUtil.format(urlObj);
}
/**
 * 构建数据格式,默认form提交
 * @param inputData 数据
 * @param inputOption  http选项
 * @returns {*}
 */
const getParams = (inputData, inputOption) => {
  const type = typeof inputData;
  if (type === 'string' || inputData instanceof File) {
    return inputData;
  }
  const ContentType = inputOption && inputOption.headers && inputOption.headers['Content-Type'];
  if (!ContentType) {
    // 默认Form提交
    return util.noNoneGetParams(inputData);
  }
  // JSON提交
  if (ContentType.indexOf('application/json') !== -1) {
    return util.noNoneGetParams(inputData, true);
  }
  // 文件提交
  if (ContentType.indexOf('multipart/form-data') !== -1) {
    return inputData;
  }
  // 默认Form提交
  return util.noNoneGetParams(inputData);
};

/**
 * 构建options，添加token信息
 * @param inputOptions http选项
 * @returns {*}
 */
const getOption = (inputOptions) => {
  const Authorization = getCookie('token');
  if (!Authorization) {
    return inputOptions || {};
  }
  if (!inputOptions) {
    return {
      headers: {
        Authorization: Authorization
      }
    };
  }
  if (!inputOptions.headers) {
    inputOptions.headers = {};
  }
  inputOptions.headers.Authorization = Authorization;
  return inputOptions;
};
async function httpMethod(originUrl, url, params, type, option, methodType){
  const axiosOption = getOption(option); // 添加token
  const cancelToken = (axiosOption && axiosOption.cancelToken) || originUrl;
  const source = CancelToken.source();
  axiosOption.cancelToken = source.token; // 添加取消请求
  if (!cancelTokenSourceMap[cancelToken]){
    cancelTokenSourceMap[cancelToken] = [];
  }
  cancelTokenSourceMap[cancelToken].push(source); // 暂存取消请求的source

  let requireArguments;
  if (methodType === 'dataMethod'){
    requireArguments = [url, params, axiosOption];
  } else {
    requireArguments = [url, axiosOption];
  }
  return await http[type](...requireArguments).then((res) => {
    const index = cancelTokenSourceMap[cancelToken].indexOf(source);
    if (index !== -1){
      cancelTokenSourceMap[cancelToken].splice(index, 1);
    }

    return res;
  }).catch((e) => {
    if (http.isCancel(e)) {
      console.error('Request canceled', e.message);
      throw e;
    } else {
      console.error(e);
      util.handleError(e);
      throw e;
    }
  });
}
/**
 * post put patch公用方法
 * @param type  方法：post、put、patch
 * @param url 路径
 * @param data 数据
 * @param option http选项
 * @returns {Promise<*>}
 */
async function dataMethod(type, url, data, option) {
  const originUrl = url;
  let params = null;
  if (data) {
    params = getParams(data, option);// 重构数据
  }
  return await httpMethod(originUrl, url, params, type, option, 'dataMethod');
}

/**
 * get delete 公用方法。将data格式化后，拼接到url后面
 * @param type  方法：get、delete
 * @param url 路径
 * @param data 数据
 * @param option http选项
 * @returns {Promise<*>}
 */
async function urlMethod(type, url, data, option) {
  const originUrl = url;
  if (data) {
    let params;
    const dataType = typeof data;
    if (dataType === 'string') {
      params = data;
    } else {
      params = util.noNoneGetParams(data);
    }
    url = addQueryToUrl(url, params);
  }
  return await httpMethod(originUrl, url, null, type, option, 'urlMethod');
}

export const axios = {
  /**
   * post请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  post: async (url, data, option) => dataMethod('post', url, data, option),
  /**
   * patch请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  patch: async (url, data, option) => dataMethod('patch', url, data, option),
  /**
   * put请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  put: async (url, data, option) => dataMethod('put', url, data, option),
  /**
   * get请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  get: async (url, data, option) => urlMethod('get', url, data, option),
  /**
   * delete请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  delete: async (url, data, option) => urlMethod('delete', url, data, option),
  /**
   * 终止某一个请求
   *
   * */
  cancelSingleRequest: (cancelToken) =>{
    if (!cancelTokenSourceMap) return;
    // 取消指定项
    if (!cancelTokenSourceMap[cancelToken]) return;

    for (const item of cancelTokenSourceMap[cancelToken]){
      item.cancel('取消一类请求');
    }
    cancelTokenSourceMap[cancelToken] = [];
  },
  /**
   * 终止所有请求
   *
   * */
  cancelAllRequest: async () =>{
    if (!cancelTokenSourceMap) return;
    // 取消全部
    for (const key in cancelTokenSourceMap){
      if (!Object.hasOwnProperty.call(cancelTokenSourceMap, key)) continue;

      for (const item of cancelTokenSourceMap[key]){
        item.cancel('取消所有请求');
      }
      cancelTokenSourceMap = {};
    }
  }
};
