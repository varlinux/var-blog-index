<template>
  <div class="app-container">
    <div class="justify-content-sb display-f">
      <h1 class="display-ib" >最新文章</h1>
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
      ></PanelCard>
    </div>

    <!-- <div class="loading-container">
      <div v-show="loading" ref="loading" class="list-template-loading"></div>
    </div> -->
  </div>
</template>

<script>
import PanelCard from "@/components/PanelCard";

export default {
  name: "ArticleList",
  inject: ['reload', 'goTo'],
  data() {
    return {
      articleList: [],
      tagList: [],
      pageIndex: 0,
      size: 9,
      loading: true,
    };
  },
  components: {
    PanelCard,
  },
  created: function () {
    this.selectArticles();
  },
  methods: {
    selectArticles() {
      const formData = {
        pageIndex: this.pageIndex,
        size: this.size,
        order: "desc",
      };
      this.$store
        .dispatch("article/getOrderByLimit", formData)
        .then(async (res) => {
          // 前台文章列表展示一般不会发生变化，所以放在created生命周期里面
          if (res) {
            const { _code, _data } = res;
            if (_code === 200) {
              this.articleList = _data;
              //   if (_data.length <= 0) {
              //     this.$message({
              //       type: "warning",
              //       message: "加载不出来更多的文章了！",
              //     });
              //     this.loading = false;
              //   }
              //   if (this.articleList.length > 0) {
              //     console.log(`if this.articleList : `, this.articleList);
              //     this.articleList = Array.from(this.articleList).concat(
              //       Array.from(_data)
              //     );
              //   } else {
              //     this.articleList = _data;
              //   }
              //   this.pageIndex++;
            }
          }
        });
    },
    selectTags() {
      this.$store.dispatch("tag/getAllTag").then((res) => {
        if (res && res._data) {
          const { _data } = res;
          this.tagList = _data;
        }
      });
    },
  },
};
</script>

<style scoped lang="sass">
@import "~@/assets/style/views/article"
</style>
