<template>
  <div id="app">
    <el-container>
      <el-container id="container">
        <Header/>
        <app-main/>
        <el-footer>
          <Footer/>
        </el-footer>
      </el-container>
      <!--侧边导航栏-->
      <Aside v-show="sidebar"/>
    </el-container>
  </div>
</template>

<script>
  import Header from './components/Header'
  import Aside from './components/Aside'
  import Footer from './components/Footer'
  import AppMain from "./AppMain";
  import {mapState} from "vuex";

  export default {
    name: 'layout',
    data() {
      return {
        mainStatus: 'articleList'
      }
    },
    computed: {
      ...mapState({
        sidebar: state => state.app.sidebar,
      })
    },
    components: {
      Header,
      Aside,
      Footer,
      AppMain
    },
    created() {
      if(process.client) {
        let deviceWidth = document.body.clientWidth
        this.$store.dispatch('app/toggleDevice', deviceWidth < 960 ? 'mobile' : 'desktop')
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "~@/assets/style/layout/index.sass"
</style>
