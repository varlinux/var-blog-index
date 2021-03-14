export default {
  methods: {
    loadingStart (ele) {
      this.loading = this.$loading({
        target: ele || document.getElementsByClassName('app-container')[0],
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    loadingEnd () {
      this.loading.close()
    },
    
    triggerLoading(ele, cb) {
      let timer = null, // 节流定时器
          time = 1 // 3s触发一次
      const intersectionObserver = new IntersectionObserver(entries => {
        if (entries[0].intersectionRatio <= 0)
          return
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          // cb()
          console.log(`triggerLoading : `, ele, cb)
        }, time * 1000)
      })
      intersectionObserver.observe(ele)
    },
  }
}
