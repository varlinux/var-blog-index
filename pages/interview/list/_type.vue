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
    <!-- <div class="loading-container">
      <div v-show="loading" class="list-template-loading"></div>
    </div> -->
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
    const { params } = this.$route;
    if (params && params.hasOwnProperty("type")) {
      this.selectArticles(params.type);
    }
  },
  methods: {
    selectArticles(type) {
      const formData = {
        atc_type: type
      }
      this.$store
        .dispatch("article/getByObj", formData)
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
@import "~@/assets/style/views/article/list"
</style>
