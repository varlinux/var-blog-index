import {
  getIndexTask
} from '@/api/sys/task'
import {json2parameter} from "@/utils/UrlUtils";

export const actions = {
  getIndexTask({commit}, data) {
    return new Promise((resolve) => {
      return getIndexTask(json2parameter(data)).then(res => {
        resolve(res)
      })
    })
  }
}
