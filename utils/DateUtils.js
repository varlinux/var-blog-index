export const github = '<svg class="gitment-github-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M25 10c-8.3 0-15 6.7-15 15 0 6.6 4.3 12.2 10.3 14.2.8.1 1-.3 1-.7v-2.6c-4.2.9-5.1-2-5.1-2-.7-1.7-1.7-2.2-1.7-2.2-1.4-.9.1-.9.1-.9 1.5.1 2.3 1.5 2.3 1.5 1.3 2.3 3.5 1.6 4.4 1.2.1-1 .5-1.6 1-2-3.3-.4-6.8-1.7-6.8-7.4 0-1.6.6-3 1.5-4-.2-.4-.7-1.9.1-4 0 0 1.3-.4 4.1 1.5 1.2-.3 2.5-.5 3.8-.5 1.3 0 2.6.2 3.8.5 2.9-1.9 4.1-1.5 4.1-1.5.8 2.1.3 3.6.1 4 1 1 1.5 2.4 1.5 4 0 5.8-3.5 7-6.8 7.4.5.5 1 1.4 1 2.8v4.1c0 .4.3.9 1 .7 6-2 10.2-7.6 10.2-14.2C40 16.7 33.3 10 25 10z"/></svg>'

export default class DateUtils {
  static format(format) {
    const o = {
      "M+": this.getMonth() + 1, //month
      "d+": this.getDate(), //day
      "h+": this.getHours(), //hour
      "m+": this.getMinutes(), //minute
      "s+": this.getSeconds(), //second
      "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
      "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  }

  static mySort(obj, key, type) {
    return obj.sort((a, b) => {
      return type === 'reverse' ? new Date(b[key]) - new Date(a[key]) : new Date(a[key]) - new Date(b[key])
    })
  }

  /**
   * 指定时间戳类型
   * @param {时间戳} date 
   * @param {类型} formatType 
   */
  static formatDateUnit(date, formatType) {
    const _formatType = formatType || 'd',
      _date = new Date(date)
    switch (_formatType) {
      case 's':
        return _date.getSeconds()
      case 'm':
        return _date.getMinutes()
      case 'h':
        return _date.getHours()
      case 'd':
        return _date.getDay()
      case 'M':
        return _date.getMonth()
      case 'y':
        return _date.getFullYear()
      default:
        return _date.getDay()
    }
  }

  /**
   * 自动计算时间戳类型
   * @param {时间戳} date 
   */
  static autoFormatTimeStamp(date) {
    // const nowDate = new Date().getTime(),
    //       publicDate = new Date(date).getTime(),
    //       units = [ '年', '个月', '天', '小时', '分' ,'秒'],
    //       // units = ['秒', '分', '小时', '天', '个月', '年'],
    //       dateMap = [
    //         (nowDate - publicDate)/1000,
    //         nowDate - publicDate,
    //         nowDate- publicDate,
    //         nowDate- publicDate,
    //         nowDate- publicDate,
    //         nowDate- publicDate,
    //       ]
          // dateMap = [
          //   nowDate.getSeconds() - publicDate.getSeconds(),
          //   nowDate.getMinutes() - publicDate.getMinutes(),
          //   nowDate.getHours() - publicDate.getHours(),
          //   nowDate.getDay() - publicDate.getDay(),
          //   nowDate.getMonth() - publicDate.getMonth(),
          //   nowDate.getFullYear() - publicDate.getFullYear()
          // ]
    const intervalTime = (new Date().getTime() - new Date(date).getTime())/1000,
          units = [ '年', '个月', '天', '小时', '分' ,'秒'],
          dateMap = [
            intervalTime/60/60/24/30/365,
            intervalTime/60/60/24/30,
            intervalTime/60/60/24,
            intervalTime/60/60,
            intervalTime/60,
            intervalTime,
          ]
    
    let index = [].slice.call(dateMap).findIndex(item => item >= 1) || 0
    return String(Math.floor(dateMap[index]) + units[index])
  }
}
