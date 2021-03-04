import {
  addSuggest
} from '@/api/suggest'

export const actions = {
  addSuggest({commit}, data) {
    return new Promise((resolve, reject) => {
      addSuggest(data).then(res => {
        resolve(res)
      })
    })
  }
}
