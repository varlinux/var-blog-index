<template>
  <div class="list-container">
    <div class="display-f justify-content-sb">
      <el-button icon="el-icon-d-arrow-left" @click="goBack(-1)">返回</el-button>
    </div>
    <div class="list-template-main">
      <div class="list-content" v-if="articleList.length > 0">
        <PanelCard
          v-for="item in articleList"
          :key="item._id"
          :tagList="tagList"
          :item="item"
        ></PanelCard>
      </div>
    </div>
    <div class="loading-container">
      <div v-show="loading" class="list-template-loading"></div>
    </div>
  </div>
</template>

<script>
import PanelCard from "@/components/PanelCard";
import DateUtils from "@/utils/DateUtils";
import ImgConfig from "@/config/ImgConfig";

export default {
  name: "index",
  inject: ['goBack'],
  data: () => ({
    articleList: [],
    tagList: [],
    pageIndex: 0,
    size: 9,
    loading: true
  }),
  computed: {
    publicDate: () => item =>
      DateUtils.autoFormatTimeStamp(item.atc_edit_time || item.atc_create_time)
  },
  components: {
    PanelCard
  },
  mounted() {
    this.triggerLoading(document.querySelector(".list-template-loading"));
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
            // if (_code === 200) {
            //   this.articleList = _data;
            // }
            if (_data.length < this.size) {
              this.$message({
                type: "warning",
                message: "加载不出来更多的文章了！"
              });
              this.loading = false;
            }
            if (this.articleList.length > 0) {
              console.log(`if this.articleList : `, this.articleList);
              this.articleList = Array.from(this.articleList).concat(
                Array.from(_data)
              );
            } else {
              this.articleList = _data;
            }
            this.pageIndex++;
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
    },
    triggerLoading(ele) {
      let timer = null, // 节流定时器
        time = 1; // 3s触发一次
      const intersectionObserver = new IntersectionObserver(entries => {
        if (entries[0].intersectionRatio <= 0) {
          return;
        }
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          this.selectArticles()
        }, time * 1000);
      });
      intersectionObserver.observe(ele);
    }
  }
};
</script>

<style scoped lang="sass">
@import "~@/assets/style/views/article/list"
</style>
