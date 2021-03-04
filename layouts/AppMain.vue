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
      reload: this.reload
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
      if(to.path === '/' || from.path === '/') {
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
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~@/assets/style/layout/index.sass"
  // @import "~@/plugsin/magic/changeColor.css"
</style>
