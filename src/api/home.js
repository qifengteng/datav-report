/*
 * @Author: qifengteng
 * @Date: 2021-01-03 22:47:00
 * @LastEditors: qifengteng
 * @LastEditTime: 2021-01-04 20:43:58
 * @Description: i love you mikasa
 */
import request from '../utils/request2'
const icode = '6FF1E42AD2664134'
export function wordcloud() {
  return request({
    url: '/screen/wordcloud',
    method: 'get',
    params: { icode }
  })
}

export function mapScatter() {
  return request({
    url: '/screen/map/scatter',
    method: 'get',
    params: { icode }
  })
}

export function screenData() {
  return request({
    url: '/screen/data',
    method: 'get',
    params: {
      icode
    }
  })
}
