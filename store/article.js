import {
  getAll,
  getByTagId,
  getByLimit,
  getOrderByLimit,
  get
} from '@/api/article'
import {json2parameter} from '@/utils/UrlUtils'

export const actions = {
  getAllArticle() {
    return new Promise((resolve) => {
      return getAll().then(res => {
        resolve(res)
      })
    })
  },
  getByTagId({commit}, tagId) {
    return new Promise(resolve => {
      return getByTagId(tagId).then(res => {
        resolve(res)
      })
    })
  },
  getByLimit({commit}, data) {
    return new Promise(resolve => {
      return getByLimit(json2parameter(data)).then(res => {
        resolve(res)
      })
    })
  },
  getOrderByLimit({commit}, data) {
    return new Promise(resolve => {
      return getOrderByLimit(json2parameter(data)).then(res => {
        resolve(res)
      })
    })
  },
  getByObj({commit}, data) {
    return new Promise(resolve => {
      return get(data).then(res => {
        resolve(res)
      })
    })
  }
}