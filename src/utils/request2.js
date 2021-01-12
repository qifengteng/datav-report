/*
 * @Author: chenky
 * @Date: 2021-01-03 22:37:27
 * @LastEditors: qifengteng
 * @LastEditTime: 2021-01-06 22:10:08
 * @Description: file content
 */
import axios from 'axios'

const service = axios.create({
  baseURL: 'https://apis.imooc.com', // 防盗版接口接入
  timeout: 5000
})

service.interceptors.response.use(
  response => {
    if (response.status === 200 && response.data) {
      console.log(response.data)
      return response.data
    } else {
      return Promise.reject(new Error('请求失败'))
    }
  },
  error => {
    return Promise.reject(error)
  }
)
export default service
