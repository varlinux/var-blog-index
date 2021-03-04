import {
  getArtypes
} from '@/api/sys/artype'

export const actions = {
  getArtypes({commit} ,data) {
    return new Promise((resolve) => {
      getArtypes(data).then(res => {
        resolve(res)
      })
    })
  }
}
