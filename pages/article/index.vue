<template>
  <div class="app-container">
    <div class="justify-content-sb display-f">
      <h1 class="display-ib">最近更新</h1>
      <el-link @click="goTo('/article/list')" :underline="false" target="_blank">
        <span>更多</span>
        <i class="el-icon-d-arrow-right"></i>
      </el-link>
    </div>
    <div class="list-content" v-if="articleList.length > 0">
      <PanelCard
        v-for="item in articleList"
        :key="item._id"
        :tagList="tagList"
        :item="item"
        type='update'
      ></PanelCard>
    </div>
    <el-divider content-position="center" class="margin-t-5-b-3">学而时习之</el-divider>
    <div class="justify-content-sb display-f">
      <h1 class="display-ib">最近发布</h1>
      <el-link @click="goTo('/article/list')" target="_blank">
        <span>更多</span>
        <i class="el-icon-d-arrow-right"></i>
      </el-link>
    </div>
    <div class="list-content" v-if="articleList.length > 0">
      <PanelCard
        v-for="item in articleList"
        :key="item._id"
        :tagList="tagList"
        :item="item"
        type='public'
      ></PanelCard>
    </div>
  </div>
</template>

<script>
import PanelCard from "@/components/PanelCard";

export default {
  name: "ArticleList",
  inject: ["reload", "goTo"],
  data() {
    return {
      articleList: [],
      tagList: [],
      pageIndex: 0,
      size: 9,
      loading: true,
      // tabList: [{
      //   title: '最近更新',
      //   url: '/article/list',
      //   articleList: this.articleList,
      //   type: 'update'
      // },{
      //   title: '最近发布',
      //   url: '/article/list',
      //   articleList: this.articleList,
      //   type: 'update'
      // }]
    };
  },
  components: {
    PanelCard
  },
  created: function() {
    this.selectArticles();
  },
  methods: {
    selectArticles() {
      const formData = {
        pageIndex: this.pageIndex,
        size: this.size,
        order: "desc"
      };
      this.$store
        .dispatch("article/getOrderByLimit", formData)
        .then(async res => {
          // 前台文章列表展示一般不会发生变化，所以放在created生命周期里面
          if (res) {
            const { _code, _data } = res;
            if (_code === 200) {
              this.articleList = _data;
            }
          }
        });
    },
    selectTags() {
      this.$store.dispatch("tag/getAllTag").then(res => {
        if (res && res._data) {
          const { _data } = res;
          this.tagList = _data;
        }
      });
    }
  }
};
</script>

<style scoped lang="sass">
@import "~@/assets/style/views/article"
</style>
