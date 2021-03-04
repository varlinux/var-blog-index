<template>
  <el-drawer
      :visible.sync="sidebar.opened"
      :size="asideWidth"
      direction="rtl">
    <el-avatar :size="80" :src="circleUrl"></el-avatar>
    <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
      <el-menu-item
          v-for="item in menuList"
          :key="item._id"
          @click="goTo(item.dir_menu_url)"
          :index="item._id">
        <i :class="iconMap[item.dir_menu_url]"></i>
        <span slot="title">{{item.dir_menu_name}}</span>
      </el-menu-item>
    </el-menu>
  </el-drawer>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "Aside",
    data() {
      return {
        childCloseAside: 'none',
        circleUrl: 'https://i.postimg.cc/3rvCJnDB/20191218091658.jpg',
        // circleUrl: require('@/assets/img/github.png'),
        asideWidth: "20%",
        menuList: [{
          '_id': 1,
          'dir_menu_url': 'https://github.com/varlinux/vue-typescript-blog',
          'dir_menu_name': 'Github'
        }],
        iconMap: {
          '/article': 'el-icon-s-home',
          '/tag': 'el-icon-price-tag',
          '/interview': 'el-icon-reading',
          '/contact': 'el-icon-phone',
          '/timeline': 'el-icon-time',
          '/task': 'el-icon-location',
          'https://github.com/varlinux/vue-typescript-blog': 'el-icon-link'
        },
        staticMenu: []
      }
    },
    computed: {
      ...mapState({
        sidebar: state => state.app.sidebar,
        device: state => state.app.device
      })
    },
    watch: {},
    mounted: function () {
      this.$store.dispatch('sys/menu/getIndexMenu').then(res => {
        if (res && res._data) {
          this.menuList.forEach(item => {
            res._data.push(item)
          })
          this.menuList = res._data.filter(item => item.dir_menu_url)
        }
      })
      this.device.toString() === 'mobile' ? this.asideWidth = '40%' : ''
    },
    methods: {
      handleOpen() {

      },
      handleClose() {

      },
      goTo(path) {
        console.log(path)
        if (path.toString().indexOf(/^http/)) {
          return location.href = path
        }
        return this.$router.push(path)
      },
    },
  }
</script>

<style scoped lang="sass">
  @import "~@/assets/style/layout/index.sass"
</style>
