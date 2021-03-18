<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive v-if="isRouterAlive">
        <Nuxt />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  provide: function() {
    return {
      reload: this.reload,
      goTo: this.goTo,
      goBack: this.goBack
    }
  },
  data: function() {
    return {
      isRouterAlive: true
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  watch: {
    $route: function(to, from) {
      if(!to.path || !from.path || to.path === '/' || from.path === '/') {
        this.$router.push({
          path: '/article'
        })
      }
    }
  },
  created() {
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    goTo(url) {
      return this.$router.push(url)
    },
    goBack(step) {
      return this.$router.go(step)
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~@/assets/style/layout/index.sass"
  // @import "~@/plugsin/magic/changeColor.css"
</style>
